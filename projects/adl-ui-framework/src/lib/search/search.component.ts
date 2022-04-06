import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchModel } from './model';

@Component({
  selector: 'adl-search',
  template: `
    <mat-form-field class="input-classic input-no-hint w-100"
			floatLabel="never">
			<input matInput
				autocomplete="off"
				[placeholder]="config.placeholder"
        (input)="onInput()">

			<mat-icon matPrefix
				class="pointer mr-2">search</mat-icon>

      <button *ngIf="form.value"
        matSuffix
        mat-icon-button
        (click)="clearInput()">
        <mat-icon>close</mat-icon>
      </button>
		</mat-form-field>
  `
})
export class SearchComponent implements OnInit {
  @Output()
  public updateSearch: EventEmitter<any>;

  @Input()
  public config!: SearchModel;

  public form!: FormControl;
  
	private debounceTime!: number;
	private debounceTimer: any;

  constructor() {
    this.updateSearch = new EventEmitter();
  }

  ngOnInit(): void {
    this.form = new FormControl('');
		this.debounceTime = 600;
  }

	public onInput(): void {
		clearTimeout(this.debounceTimer);

		this.debounceTimer = setTimeout(() => {
			this.updateSearch.emit(this.form.value);
		}, this.debounceTime);
	}

	public clearInput(): void {
		this.form.setValue(null);
		this.updateSearch.emit(this.form.value);
	}
}
