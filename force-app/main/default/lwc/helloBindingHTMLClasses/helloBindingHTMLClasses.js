import { LightningElement } from "lwc";

export default class extends LightningElement {
  position = "left";
  fullWidth = true;
  hidden = false;

  get computedClassNames() {
    return [
      "div__block",
      this.position && `div_${this.position}`,
      {
        "div_full-width": this.fullWidth,
        hidden: this.hidden,
      },
    ];
  }
}