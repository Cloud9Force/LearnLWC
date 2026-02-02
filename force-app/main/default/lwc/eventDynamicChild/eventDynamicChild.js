// eventHandlingPlaygroundParent.html
import { LightningElement } from "lwc";

export default class EventDynamicChild extends LightningElement {
  connectedCallback() {
    // Dispatch a custom event when this component is connected
    this.dispatchEvent(
      new CustomEvent("customEvent", {
        detail: "customEvent from child component connectedCallback",
      }),
    );
    this.dispatchEvent(
      new CustomEvent("anotherCustomEvent", {
        detail: "anotherCustomEvent from child component connectedCallback",
      }),
    );
  }

  handleButtonClick() {
    this.dispatchEvent(
      new CustomEvent("customEvent", {
        detail: "Button clicked in child component for customEvent",
      }),
    );
    this.dispatchEvent(
      new CustomEvent("anotherCustomEvent", {
        detail: "Button clicked in child component for anotherCustomEvent",
      }),
    );
  }
}