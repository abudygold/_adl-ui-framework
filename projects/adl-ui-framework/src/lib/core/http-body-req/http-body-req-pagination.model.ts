export class HttpBodyReqPaginationModel {
	public pageSize: number;
	public pageNo: number;

	constructor() {
		this.pageSize = 10;
		this.pageNo = 1;
	}

	public convert(): any {
		return {
			pageSize: this.pageSize,
			pageNo: this.pageNo,
		};
	}
}
