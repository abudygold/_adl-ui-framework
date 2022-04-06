import { HttpBodyReqPaginationModel } from "../http-body-req";

export class BaseParamReqModel extends HttpBodyReqPaginationModel {
	public filter?: string;

	constructor() {
		super();
	}

	public convert(): any {
		return {
			filter: this.filter,
			pageNo: this.pageNo,
			pageSize: this.pageSize,
		};
	}
}
