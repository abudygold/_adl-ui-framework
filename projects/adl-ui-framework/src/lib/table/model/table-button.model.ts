export class TableButtonModel {
    label: string;
    action: string;
    disabled: boolean;
    icon: string;
    customIcon?: boolean;

    constructor(
        label: string,
        action: string,
        disabled: boolean = false,
        icon: string,
        customIcon?: boolean,
    ) {
        this.label = label;
        this.action = action;
        this.disabled = disabled;
        this.icon = icon;
        this.customIcon = customIcon;
    }
}
