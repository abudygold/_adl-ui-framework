export class SearchModel {
    public placeholder: string;
    public isSuffix!: boolean;

    constructor(
        placeholder: string = 'Search',
        isSuffix: boolean = false
    ) {
        this.placeholder = placeholder;
        this.isSuffix = isSuffix;
    }
}
