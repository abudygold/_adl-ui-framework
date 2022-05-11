import { NgModule } from '@angular/core';
import { DecimalNumberPipe } from './decimal-number';

@NgModule({
	declarations: [DecimalNumberPipe],
	exports: [DecimalNumberPipe],
})
export class DecimalNumberModule {}
