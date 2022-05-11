import { MatTableDataSource } from '@angular/material/table';
import { TableButtonModel } from './table-button.model';

export class TableModel {
	public columns: any[];
	public dataSource: MatTableDataSource<any>;
	public labels: string[];
	public page: number;
	public pageSize: number;
	public totalData: number;
    public actions: TableButtonModel[];
    public isSequence: boolean;

	constructor(
        dataSource: any,
        totalData: number,
        columns: any[],
        labels: string[],
        page: number = 1,
        pageSize: number = 10,
        actions: TableButtonModel[] = [],
        isSequence: boolean = false
    ) {
		this.dataSource = new MatTableDataSource<any>(dataSource);
		this.totalData = totalData;
		this.columns = columns;
		this.labels = labels;
		this.page = page;
		this.pageSize = pageSize;
		this.actions = actions;
		this.isSequence = isSequence;
	}

	public getNumber(index: number, limit: number): number {
		return (this.page - 1) * limit + (index + 1);
	}

	public getPageIndex(): number {
		return this.page - 1;
	}

	public isEmpty(): boolean {
		return this.totalData === 0;
	}

	public setPage(page: number) {
		this.page = page;
	}

	public setPageSize(size: number) {
		this.pageSize = size;
	}

	public resetPage() {
		this.page = 1;
	}
}
