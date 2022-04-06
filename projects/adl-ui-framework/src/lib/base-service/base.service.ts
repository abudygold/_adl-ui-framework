import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { generateHttpParams } from '../core/util';
import { HttpBodyRespModel } from '../core/http-body-resp';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
	constructor(private http: HttpClient) {}

	public getBlobData(url: string, requestParamModel?: any): Observable<any> {
		const params = requestParamModel
			? generateHttpParams(requestParamModel.convert())
			: {};

		return this.http.get(url, {
			params,
			responseType: 'blob',
		});
	}

	public getData(
		url: string,
		responseModel: any,
		requestParamModel?: any,
		isArray?: boolean
	): Observable<any> {
		const params = requestParamModel
			? generateHttpParams(requestParamModel.convert())
			: {};

		return this.http.get(url, { params }).pipe(
			map(
				(model: any): HttpBodyRespModel =>
					new HttpBodyRespModel().convert(model)
			),
			map((model: HttpBodyRespModel): any => {
				return responseModel
					? isArray
						? this.mapArrayData(model.data, responseModel)
						: this.mapObjectData(model.data, responseModel)
					: model;
			})
		);
	}

	public getDataPaging(
		url: string,
		responseModel: any,
		requestParamModel?: any
	): Observable<any> {
		const params = requestParamModel
			? generateHttpParams(requestParamModel.convert())
			: {};

		return this.http.get(url, { params }).pipe(
			map(
				(model: any): HttpBodyRespModel =>
					new HttpBodyRespModel().convert(model)
			),
			map((model: HttpBodyRespModel): any => {
        if (responseModel) {
					model.data = this.mapArrayData(model.data, responseModel);
				}
				return model;
			})
		);
	}

	public postBlobData(
		url: string,
		requestBodyModel: any,
		requestParamModel?: any
	): Observable<any> {
		const params = requestParamModel
			? generateHttpParams(requestParamModel.convert())
			: {};

		const body = requestBodyModel
      ? requestBodyModel.convert()
      : requestBodyModel;

		return this.http.post(url, body, {
			params,
			responseType: 'blob',
		});
	}

	public postData(
		url: string,
		requestBodyModel: any,
		responseModel?: any,
		requestParamModel?: any,
		isArray?: boolean,
	): Observable<any> {
		const params = requestParamModel
			? generateHttpParams(requestParamModel.convert())
			: {};
		const body = requestBodyModel ? requestBodyModel.convert() : {};

		return this.http.post(url, body, { params }).pipe(
			map(
				(model: any): HttpBodyRespModel =>
					new HttpBodyRespModel().convert(model)
			),
			map((model: HttpBodyRespModel): any => {
				return responseModel
					? isArray
						? this.mapArrayData(model.data, responseModel)
						: this.mapObjectData(model.data, responseModel)
					: model;
			})
		);
	}

	public putData(
		url: string,
		requestBodyModel: any,
		responseModel?: any,
		requestParamModel?: any
	): Observable<any> {
		const params = requestParamModel
			? generateHttpParams(requestParamModel.convert())
			: {};
		const body = requestBodyModel ? requestBodyModel.convert() : {};

		return this.http.put(url, body, { params }).pipe(
			map(
				(model: any): HttpBodyRespModel =>
					new HttpBodyRespModel().convert(model)
			),
			map((model: HttpBodyRespModel): any => {
				return responseModel
					? this.mapObjectData(model.data, responseModel)
					: model;
			})
		);
	}

	public patchData(
		url: string,
		requestBodyModel: any,
		responseModel?: any,
		requestParamModel?: any
	): Observable<any> {
		const params = requestParamModel
			? generateHttpParams(requestParamModel.convert())
			: {};
		const body = requestBodyModel ? requestBodyModel.convert() : {};

		return this.http
			.patch(url, body, { params })
			.pipe(
				map(
					(model: any): HttpBodyRespModel =>
						new HttpBodyRespModel().convert(model)
				),
				map((model: HttpBodyRespModel): any => {
					return responseModel
						? this.mapObjectData(model.data, responseModel)
						: model;
				})
			);
	}

	public deleteData(
		url: string,
		requestParamModel: any,
		responseModel?: any,
		requestBodyModel?: any
	): Observable<any> {
		const params = requestParamModel
			? generateHttpParams(requestParamModel.convert())
			: {};

		const options = {
			params,
			body: requestBodyModel ? requestBodyModel.convert() : null,
		};

		return this.http.delete(url, options).pipe(
			map(
				(model: any): HttpBodyRespModel =>
					new HttpBodyRespModel().convert(model)
			),
			map((model: HttpBodyRespModel): any => {
				return responseModel
					? this.mapObjectData(model.data, responseModel)
					: model;
			})
		);
	}

	private mapObjectData(dto: any, responseModel: any) {
		if (Object.entries(dto).length === 0) {
			return null;
		}

		const dataModel = new responseModel().convert(dto);
		return dataModel;
	}

	private mapArrayData(dtos: any[], responseModel: any) {
    if (dtos === null) {
			return null;
		}

		const dataModel = dtos?.reduce((result, each) => {
			const model = new responseModel();
			result.push(model.convert(each));

			return result;
		}, []);

		return dataModel;
	}
}
