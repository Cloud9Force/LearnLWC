import { LightningElement } from 'lwc';
import recipesLogo from '@salesforce/contentAssetUrl/einstein';

//import recipesLogo1 from '@salesforce/contentAssetUrl/trailhead_characters';
// Import custom labels
import helloLabel from '@salesforce/label/c.Hello_Label';

import Id from '@salesforce/user/Id';
import hasViewSetup from '@salesforce/userPermission/ViewSetup';
import hasModifyAllData from '@salesforce/userPermission/ModifyAllData';

// import the permission from userPermission (standard Salesforce permissions) or
// customPermission (custom org-defined permissions)
import hasAccessRestrictedUI from '@salesforce/customPermission/accessRestrictedUIPermission';
//import property from "@salesforce/user/property";
//import userRole from "@salesforce/user/UserRole.Name";



export default class MiscStaticResource extends LightningElement {
    // Expose the content asset URL for use in the template
    recipesLogoUrl = recipesLogo;
    //recipesLogo1Url1 = recipesLogo1;
    label = {
        helloLabel,
      };
    userId = Id;
    get isSetupEnabled() {
        console.log('hasViewSetup', hasViewSetup);
        return !hasViewSetup;
    }

    get isModifyAllDataEnabled() {
        console.log('hasModifyAllData', hasModifyAllData);
        return !hasModifyAllData;
    }

    // surface imported permission to HTML template with getter
    get isRestrictedUIAccessible() {
        console.log('hasAccessRestrictedUI', hasAccessRestrictedUI);
        return hasAccessRestrictedUI;
    }
    
}