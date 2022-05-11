export class HttpBodyRespModel {
	public status: number;
	public message: string;
	public data: any;
	public totalRecord: number;
	public pageSize: number;
	public pageNo: number;

	constructor() {
		this.status = 0;
		this.message = '';
		this.data = null;
		this.totalRecord = 0;
		this.pageSize = 0;
		this.pageNo = 0;
	}

	public convert(dto: any): HttpBodyRespModel {
		if (!dto.data) {
			this.data = dto;
			return this;
		}

		this.status = dto.status;
		this.message = dto.message;
		this.data = dto.data;
		this.totalRecord = dto.totalRecord;
		this.pageSize = dto.pageSize;
		this.pageNo = dto.pageNo;

		return this;
	}
}
