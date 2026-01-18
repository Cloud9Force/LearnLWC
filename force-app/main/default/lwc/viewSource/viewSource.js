import { LightningElement } from 'lwc';

expoaseURL =
'https://github.com/trailheadapps/lwc-recipes/tree/main/force-app/main/default/';

@api source;

get sourceURL() {
return this.baseURL + this.source;
}rt default class ViewSource extends LightningElement {

}