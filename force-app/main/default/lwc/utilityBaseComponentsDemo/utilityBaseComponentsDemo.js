import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import LightningPrompt from 'lightning/prompt';

export default class UtilityBaseComponentsDemo extends LightningElement {

    // =============================
    // SLIDER
    // =============================
    volume = 50;

    handleVolumeChange(event) {
        // Slider value comes from event.target.value
        this.volume = event.target.value;
    }

    // =============================
    // RECORD PICKER
    // =============================
    recordId = '';
    displayInfo = {
        primaryField: 'Name',
        additionalFields: ['Industry', 'Type']
    };
    filter = {
        criteria: [
            {
                fieldPath: 'Industry',
                operator: 'eq',
                value: 'Technology'
            },
            {
                fieldPath: 'Type',
                operator: 'eq',
                value: 'Customer'
            }
        ],
        filterLogic: '1 OR 2'
    };
    handleRecordSelect(event) {
        // Record picker returns recordId in event.detail.recordId
        this.recordId = event.detail.recordId;
    }

    // =============================
    // PILL
    // =============================
    pillItems = [
        {
            type: 'icon',
            label: 'Salesforce',
            name: 'salesforce',
            iconName: 'standard:account'
        },
        {
            type: 'icon',
            label: 'LWC',
            name: 'lwc',
            iconName: 'utility:light_bulb'
        }
    ];

    handlePillRemove(event) {
        const removedPill = event.detail.item?.name;
        alert(`Removed pill: ${removedPill}`);
    }
    infoText;

    handleRemove() {
        this.infoText = 'Remove button was clicked';
    }

    // =============================
    // MAP
    // =============================
    mapMarkers = [
        {
            location: {
                City: 'London',
                Country: 'UK'
            },
            title: 'London'
        },
        {
            location: {
                City: 'Mumbai',
                Country: 'India'
            },
            title: 'Mumbai'
        }
    ];

    // =============================
    // NAVIGATION ITEM
    // =============================
    navigateToSalesforce() {
        window.open('https://www.salesforce.com', '_blank');
    }

    // =============================
    // PROGRESS BAR
    // =============================
    progress = 20;

    increaseProgress() {
        if (this.progress < 100) {
            this.progress += 10;
        }
    }

    // =============================
    // TOAST
    // =============================
    showToast() {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'This is a toast message',
                mode:'sticky', //sticky, dismissible
                variant: 'success'//warning,success,error
            })
        );
    }

    showStickyToast() {
        const event = new ShowToastEvent({
            title: 'Get Help',
            message:
                'Salesforce documentation is available in the app. Click ? in the upper-right corner.',
                messageData: [
                    'Salesforce',
                    {
                        url: 'http://www.salesforce.com/',
                        label: 'here',
                    },
                ],
        });
        this.dispatchEvent(event);
    }

    // =============================
    // PROMPT
    // =============================
    async showPrompt() {
        const result = await LightningPrompt.open({
            message: 'Enter your name',
            label: 'User Input',
            defaultValue: 'initial input value',
            theme:'success',
            variant:'border-header' //headerless
        });

        if (result) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Input Received',
                    message: `Hello ${result}`,
                    variant: 'info'//warning,success,error
                })
            );
        }
    }

    @track
    myBreadcrumbs = [
        { label: 'Account', name: 'parent', id: 'account1' },
        { label: 'Child Account', name: 'child', id: 'account2' },
    ];
    breadCrumbsMap = {
        parent: 'http://www.google.com/',
        child: 'http://www.google.com/search?q=lwc',
    };

    handleNavigateTo(event) {
        // prevent default navigation by href
        event.preventDefault();

        const name = event.target.name;
        console.log('name', name);
        if (this.breadCrumbsMap[name]) {
            window.location.assign(this.breadCrumbsMap[name]);
        }
    }

    get breadcrumbsJson() {
        return JSON.stringify(this.myBreadcrumbs, null, 2);
    }
}