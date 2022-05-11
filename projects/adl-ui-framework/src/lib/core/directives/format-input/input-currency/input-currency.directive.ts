import { HostListener, Directive } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
	selector: '[appInputCurrency]'
})
export class InputCurrencyDirective {
	private nominalValue!: string;

	constructor(
		private ngControl: NgControl
	) {}

	@HostListener('keyup', ['$event'])
	onkeyup(event: Event) {
		/* Transform input into number format (e.g :1000 ==> 1.000) */
		const value = (<HTMLInputElement>event.target).value;

		this.nominalValue = value.toString().split('.').join('');
		this.ngControl.control?.setValue(
			this.nominalValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
		);
	}

}
