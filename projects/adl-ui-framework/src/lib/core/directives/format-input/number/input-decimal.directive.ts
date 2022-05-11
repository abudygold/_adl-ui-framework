import { DecimalPipe } from '@angular/common';
import {
	Directive,
	HostListener,
	OnChanges,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputNumberDirective } from './input-number.directive';

@Directive({
	selector: '[appInputDecimal]',
})
export class InputDecimalDirective
	extends InputNumberDirective
	implements OnInit, OnDestroy, OnChanges {
	private decimalPipe!: DecimalPipe;

	@HostListener('blur', [])
	public onBlur() {
		super.onBlur();
	}

	@HostListener('keydown', ['$event'])
	public onKeyDown(event: KeyboardEvent) {
		super.onKeyDown(event);
	}

	ngOnInit() {
		super.ngOnInit();

		this.allowComma = true;
	}

	ngOnDestroy() {
		super.ngOnDestroy();
	}

	ngOnChanges() {
		super.ngOnChanges();
	}

	/**
	 * override super.valueChange();
	 */
	public valueChange() {
		this.transformToDecimal();
		this.checkMinMaxValue();
	}

	private transformToDecimal() {
		if (!this.decimalPipe) {
			this.decimalPipe = new DecimalPipe('id-ID');
		}

		if (this.value) {
			const targetValue = this.value.toString().replace(',', '.');

			this.ngControl.control?.setValue(Number(targetValue), {
				emitEvent: false,
			});

			const formatedValue = targetValue.toString().replace('.', ',');

			this.ngControl.valueAccessor?.writeValue(formatedValue);

			this.value = targetValue;
		}
	}
}
