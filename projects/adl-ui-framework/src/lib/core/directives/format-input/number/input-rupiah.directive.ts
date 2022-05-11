import {
	Directive,
	HostListener,
	OnChanges,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { RupiahPipe } from '../../../pipes/rupiah/rupiah';
import { InputNumberDirective } from './input-number.directive';

@Directive({
	selector: '[appInputRupiah]',
})
export class InputRupiahDirective extends InputNumberDirective
	implements OnInit, OnDestroy, OnChanges {
	private rupiahPipe!: RupiahPipe;

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
		this.transformToRupiah();
		this.checkMinMaxValue();
		this.checkMinMaxDigit();
	}

	private transformToRupiah() {
		if (!this.rupiahPipe) {
			this.rupiahPipe = new RupiahPipe();
		}

		const targetValue = this.rupiahPipe.parse(String(this.value));

		if (Number(targetValue) > 0) {
			this.ngControl.control?.setValue(Number(targetValue), {
				emitEvent: false,
			});

			const formatedValue = this.rupiahPipe.transform(
				Number(targetValue)
			);

			this.ngControl.valueAccessor?.writeValue(formatedValue);
		} else {
			this.ngControl.control?.setValue(null, {
				emitEvent: false,
			});

			this.elementRef.nativeElement.value = null;
		}

		this.value = targetValue;
	}
}
