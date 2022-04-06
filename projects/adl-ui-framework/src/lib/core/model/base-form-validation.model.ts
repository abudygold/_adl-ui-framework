export class BaseFormValidationModel {
    public type: string;
    public message: string;
    public validator: any[];

    constructor(
        type: string,
        message: string,
        validator: any[],
    ) {
        this.type = type;
        this.message = message;
        this.validator = validator;
    }
}