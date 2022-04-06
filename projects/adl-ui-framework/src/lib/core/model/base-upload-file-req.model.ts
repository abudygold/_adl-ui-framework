export class BaseUploadFileReqModel {
	public file!: File;

	public convert(): any {
		const formData = new FormData();
		formData.append('file', this.file);

		return formData;
	}
}
