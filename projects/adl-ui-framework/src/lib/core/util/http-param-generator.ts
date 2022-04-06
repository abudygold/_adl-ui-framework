import { HttpParams } from '@angular/common/http';

export const generateHttpParams =
	(params: any): HttpParams => {
		let httpParams = new HttpParams();

		if (params) {
			Object.keys(params).forEach((key) => {
				if (params[key] !== null
					&& params[key] !== undefined
					&& params[key] !== '') {

					httpParams = httpParams.set(key, params[key]);
				}
			});
		}

		return httpParams;
	};
