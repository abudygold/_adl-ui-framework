import { NgModule } from '@angular/core';
import { InputCurrencyDirective } from './input-currency';
import {
	InputDecimalDirective,
	InputNumberDirective,
	InputQuantityDirective,
	InputRupiahDirective,
} from './number';
import { OnlyNumberDirective } from './only-number';

@NgModule({
	declarations: [
		InputCurrencyDirective,
		InputDecimalDirective,
		InputNumberDirective,
		InputQuantityDirective,
		InputRupiahDirective,
		OnlyNumberDirective,
	],
	exports: [
		InputCurrencyDirective,
		InputDecimalDirective,
		InputNumberDirective,
		InputQuantityDirective,
		InputRupiahDirective,
		OnlyNumberDirective,
	],
})
export class FormatInputModule {}
