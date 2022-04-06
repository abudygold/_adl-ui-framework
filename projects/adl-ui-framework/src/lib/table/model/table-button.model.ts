export class TableButtonModel {
    label: string;
    color: 'primary' | 'accent' | 'warn';
    disabled: boolean;
    icon?: string;

    constructor(
        label: string,
        color: 'primary' | 'accent' | 'warn' = 'primary',
        disabled: boolean = false,
        icon?: string,
    ) {
        this.label = label;
        this.color = color;
        this.disabled = disabled;
        this.icon = icon;
    }
}
