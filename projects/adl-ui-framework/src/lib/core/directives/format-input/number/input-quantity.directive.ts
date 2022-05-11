import { DecimalPipe } from '@angular/common';
import {
	Directive,
	HostListener,
	OnChanges,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { InputNumberDirective } from './input-number.directive';

@Directive({
	selector: '[appInputQuantity]',
})
export class InputQuantityDirective extends InputNumberDirective
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

		this.preventFirstNumberZero = true;
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
		this.transformToThousand();
		this.checkMinMaxValue();
		this.checkMinMaxDigit();
	}

	private transformToThousand() {
		if (!this.decimalPipe) {
			this.decimalPipe = new DecimalPipe('id-ID');
		}

		if (this.value) {
			const targetValue = this.value.toString().split('.').join('');

			this.ngControl.control?.setValue(Number(targetValue), {
				emitEvent: false,
			});

			const formatedValue = this.decimalPipe.transform(
				Number(targetValue)
			);

			this.ngControl.valueAccessor?.writeValue(formatedValue);

			this.value = targetValue;
		}
	}
}
