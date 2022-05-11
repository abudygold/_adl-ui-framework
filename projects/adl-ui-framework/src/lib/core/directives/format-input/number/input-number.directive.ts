import {
	Directive,
	ElementRef,
	HostListener,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	Self,
} from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
	selector: '[appInputNumber]',
})
export class InputNumberDirective implements OnInit, OnDestroy, OnChanges {
	@Input()
	private maxDigit!: number;

	@Input()
	private minDigit!: number;

	@Input()
	private maxValue!: number;

	@Input()
	private minValue!: number;

	public allowComma!: boolean;
	public preventFirstNumberZero!: boolean;
	public subscribers!: Subscription[];
	public value!: string;

	@HostListener('blur', [])
	public onBlur() {
		this.checkMinMaxDigit();
	}

	@HostListener('keydown', ['$event'])
	public onKeyDown(event: KeyboardEvent) {
		if (this.preventFirstNumberZero && this.checkFirstNumberZero(event)) {
			event.preventDefault();
		}
		if (this.allowComma && this.checkComma(event)) {
			return;
		}
		if (this.checkCmdCtrlAny(event)) {
			return;
		}
		if (this.checkSpecialKeys(event)) {
			return;
		}
		if (this.checkNumber(event)) {
			return;
		}

		event.preventDefault();
	}

	constructor(
		@Self()
		public ngControl: NgControl,
		public elementRef: ElementRef
	) {}

	ngOnInit() {
		this.subscribers = [];

		this.setValueChange();
	}

	ngOnDestroy() {
		this.subscribers.forEach((each) => each.unsubscribe());
	}

	ngOnChanges() {
		this.value = this.ngControl.value;

		this.valueChange();
	}

	private setValueChange() {
		const subs = (this.ngControl.control as FormControl)
			.valueChanges
			.subscribe((value) => {
				this.value = value;

				this.valueChange();
			});

		this.subscribers.push(subs);
	}

	public valueChange() {
		this.checkMinMaxValue();
	}

	public checkMinMaxValue() {
		if (this.value) {
			if (
				this.minValue !== undefined &&
				Number(this.value) < Number(this.minValue)
			) {
				this.ngControl.control?.setValue(this.minValue);
			}

			if (
				this.maxValue !== undefined &&
				Number(this.value) > Number(this.maxValue)
			) {
				this.ngControl.control?.setValue(this.maxValue);
			}
		}
	}

	public checkMinMaxDigit() {
		if (this.value) {
			const valueDigit = this.value.toString().length;

			if (this.minDigit !== undefined && valueDigit < this.minDigit) {
				this.ngControl.control?.setValue(
					('0' + this.value).slice(-this.minDigit)
				);
			}
			if (this.maxDigit !== undefined && valueDigit > this.maxDigit) {
				this.ngControl.control?.setValue(
					this.value.substr(0, this.maxDigit)
				);
			}
		}
	}

	private checkCmdCtrlAny(event: KeyboardEvent): boolean {
		if (
			(event.keyCode > 0 && event.ctrlKey === true) ||
			(event.keyCode > 0 && event.metaKey === true)
		) {
			return true;
		}

		return false;
	}

	private checkSpecialKeys(event: KeyboardEvent): boolean {
		const input = event.key;
		const specialKeys = [
			'ArrowLeft',
			'ArrowRight',
			'Backspace',
			'Del',
			'Delete',
			'Enter',
			'Escape',
			'End',
			'Home',
			'Tab',
		];

		if (specialKeys.indexOf(input) !== -1) {
			return true;
		}

		return false;
	}

	private checkNumber(event: KeyboardEvent): boolean {
		const input = event.key;
		const numberRegex = /[0-9]+/g;

		if (numberRegex.test(input)) {
			return true;
		}

		return false;
	}

	private checkFirstNumberZero(event: KeyboardEvent): boolean {
		if (!this.value) {
			return false;
		}

		if (!this.value.length && event.key === '0') {
			return true;
		}

		return false;
	}

	private checkComma(event: KeyboardEvent): boolean {
		if (!this.value) {
			return false;
		}

		if (event.key === ',' && !/\,/g.test(this.value)) {
			return true;
		}

		return false;
	}
}
