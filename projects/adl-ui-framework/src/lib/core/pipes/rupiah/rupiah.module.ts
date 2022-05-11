import { NgModule } from '@angular/core';

import { RupiahPipe } from './rupiah';

@NgModule({
	declarations: [
		RupiahPipe
	],
	exports: [
		RupiahPipe
	]
})
export class RupiahModule { }
