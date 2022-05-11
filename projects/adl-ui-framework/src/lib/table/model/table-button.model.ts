export class TableButtonModel {
    label: string;
    selector: 'flat' | 'stroked';
    type: 'basic' | 'basicWithIcon' | 'icon' | 'rounded' | 'roundedWithIcon';
    color: 'primary' | 'accent' | 'warn';
    action: string;
    disabled: boolean;
    icon?: string;

    constructor(
        label: string,
        action: string,
        selector: 'flat' | 'stroked' = 'flat',
        type: 'basic' | 'basicWithIcon' | 'icon' | 'rounded' | 'roundedWithIcon' = 'basic',
        color: 'primary' | 'accent' | 'warn' = 'primary',
        disabled: boolean = false,
        icon?: string,
    ) {
        this.label = label;
        this.action = action;
        this.selector = selector;
        this.type = type;
        this.color = color;
        this.disabled = disabled;
        this.icon = icon;
    }
}
