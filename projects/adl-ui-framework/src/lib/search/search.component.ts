import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchModel } from './model';

@Component({
  selector: 'adl-search',
  template: `
    <mat-form-field class="input-classic input-no-hint search-input w-100"
			floatLabel="never">
			<input matInput
				autocomplete="off"
				[placeholder]="config.placeholder"
				[formControl]="form"
        		(input)="onInput()">

			<mat-icon *ngIf="!form.value"
				matPrefix
				svgIcon="icon-search-grey-bold"
				class="icon-line-height mr-2"></mat-icon>

			<mat-icon *ngIf="form.value"
				matPrefix
				svgIcon="icon-search-blue-bold"
				class="icon-line-height mr-2"></mat-icon>

			<button *ngIf="form.value"
				mat-flat-button
				matSuffix
				color="primary"
				class="button-icon search-button px-2"
        (click)="onSubmit()">
				<mat-icon svgIcon="icon-search-white"
					class="icon-line-height"></mat-icon>
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
      if (this.form.value.length === 0) {
        this.updateSearch.emit(this.form.value);
      }
		}, this.debounceTime);
	}

  public onSubmit(): void {
    this.updateSearch.emit(this.form.value);
  }
}
