import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToControlPipe } from './to-control';

@NgModule({
	declarations: [ToControlPipe],
	imports: [CommonModule],
	exports: [ToControlPipe],
})
export class ToControlModule {}
