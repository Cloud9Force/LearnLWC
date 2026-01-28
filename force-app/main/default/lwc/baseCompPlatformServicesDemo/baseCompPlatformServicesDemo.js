import { LightningElement, track, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import USER_ID from '@salesforce/user/Id';
import NAME_FIELD from '@salesforce/schema/User.Name';

// ============================
// MESSAGE SERVICE
// ============================
import { publish, subscribe, MessageContext } from 'lightning/messageService';
import SAMPLE_CHANNEL from '@salesforce/messageChannel/SampleMessageChannel__c';

// ============================
// REFRESH
// ============================
import { RefreshEvent } from 'lightning/refresh';

// ============================
// LOGGER
// ============================
import { log, error } from 'lightning/logger';

export default class PlatformServicesDemo extends LightningElement {

    @track receivedMessage = 'None';
    @track lastRefreshTime = 'Never';
    @track uiLogs = [];
    @track lastLogMessage = 'No logs yet';
    @track lastLogLevel = 'info';
    userId = USER_ID;

    // Required for Lightning Message Service
    @wire(MessageContext)
    messageContext;

    @wire(getRecord, { recordId: '$userId', fields: [NAME_FIELD] })
    wiredUser;

    get userName() {
        return this.wiredUser?.data?.fields?.Name?.value || 'Unknown';
    }

    connectedCallback() {
        // Subscribe to the message channel
        subscribe(
            this.messageContext,
            SAMPLE_CHANNEL,
            (message) => {
                this.receivedMessage = message.text;
            }
        );
    }

    /**
     * Publishes a message to all subscribers
     */
    publishMessage() {
        publish(this.messageContext, SAMPLE_CHANNEL, {
            text: 'Publishing Hello from Message Service'
        });
    }

    /**
     * Triggers Lightning Refresh
     * Used to refresh data across components
     */
    triggerRefresh() {
        this.dispatchEvent(new RefreshEvent());
        this.lastRefreshTime = new Date().toLocaleTimeString();
    }

    /**
     * Structured logging (Info)
     */
    logInfo() {
        log('This is an informational log from LWC');
        this.addUiLog('info', 'This is an informational log from LWC');
    }

    /**
     * Structured logging (Error)
     */
    logError() {
        try {
            error('This is an error log from LWC');
            this.addUiLog('error', 'This is an error log from LWC');
        } catch (e) {
            this.addUiLog(
                'error',
                'Logger unavailable in this org/runtime'
            );
        }
    }

    addUiLog(level, message) {
        const timestamp = new Date().toLocaleTimeString();
        this.lastLogLevel = level;
        this.lastLogMessage = message;
        this.uiLogs = [
            { id: `${timestamp}-${level}-${this.uiLogs.length}`, level, message, timestamp },
            ...this.uiLogs
        ];
    }
}
