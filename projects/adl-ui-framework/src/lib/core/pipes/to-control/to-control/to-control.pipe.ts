import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Pipe({
	name: 'toControl',
})
export class ToControlPipe implements PipeTransform {
	transform(abstractControl: AbstractControl | null): FormControl {
		const control = abstractControl as FormControl;
		return control;
	}
}
