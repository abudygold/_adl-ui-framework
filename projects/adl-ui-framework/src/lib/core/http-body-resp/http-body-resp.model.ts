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
		if (dto.status) {
			this.status = dto.status;
		}
		if (dto.message) {
			this.message = dto.message;
		}
		if (dto.data) {
			this.data = dto.data;
		}
		if (dto.totalRecord >= 0) {
			this.totalRecord = dto.totalRecord;
		}
		if (dto.pageSize >= 0) {
			this.pageSize = dto.pageSize;
		}
		if (dto.pageNo >= 0) {
			this.pageNo = dto.pageNo;
		}

		return this;
	}
}
