import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { TableModel } from './model';

@Component({
  selector: 'adl-table',
  template: `
    <table mat-table
      matSort
      matSortDisableClear
      class="w-100 mb-3"
      [dataSource]="table.dataSource"
      (matSortChange)="sort()">

      <!-- Generate Sequence Number -->
      <ng-container *ngIf="table.isSequence"
        matColumnDef="no">
        <th mat-header-cell
          *matHeaderCellDef>
          No
        </th>

        <td mat-cell
          *matCellDef="let row; let i = index">
          {{ table.getNumber(i, table.pageSize) }}
        </td>
      </ng-container>

      <ng-container [matColumnDef]="column.value"
        *ngFor="let column of table.columns; let idx = index">
        <th mat-header-cell
          *matHeaderCellDef
          [mat-sort-header]="column.value">
          {{ table.labels[idx] }}
        </th>

        <!-- Format: String -->
        <ng-container *ngIf="column.format === 'string'">
          <td mat-cell
            *matCellDef="let row"
            class="text-capitalize">
            {{ row[column.value] ? row[column.value] : '-' }}
          </td>
        </ng-container>

        <!-- Format: Date -->
        <ng-container *ngIf="column.format === 'date'">
          <td mat-cell
            *matCellDef="let row">
            <ng-container *ngIf="row[column.value]">
              {{ row[column.value] | date:'yyyy-MM-dd' }}
            </ng-container>

            <ng-container *ngIf="!row[column.value]">
              {{ '-' }}
            </ng-container>
          </td>
        </ng-container>

        <!-- Format: Number -->
        <ng-container *ngIf="column.format === 'number'">
          <td mat-cell
            *matCellDef="let row">
            <ng-container *ngIf="row[column.value]">
              {{ row[column.value] | number }}
            </ng-container>

            <ng-container *ngIf="!row[column.value]">
              {{ '-' }}
            </ng-container>
          </td>
        </ng-container>

        <!-- Format: Image -->
        <ng-container *ngIf="column.format === 'image'">
          <td mat-cell
            *matCellDef="let row">
            <img *ngIf="row[column.value]; else defaultAvatar"
              [src]="row[column.value]"
              [alt]="row[column.value]">
          </td>
        </ng-container>
      </ng-container>

      <!-- Actions -->
      <ng-container *ngIf="table.actions.length > 0"
        matColumnDef="actions">
        <th mat-header-cell
          *matHeaderCellDef>
          Actions
        </th>

        <td mat-cell
          *matCellDef="let row">
          <ng-container *ngFor="let button of table.actions">
            <!-- Flat -->
            <button *ngIf="button.type === 'basic' && button.selector === 'flat'"
              mat-flat-button
              class="mr-1"
              [color]="button.color"
              [disabled]="button.disabled"
              (click)="onClick(row, button.action)">
              {{button.label}}
            </button>

            <button *ngIf="button.type === 'basicWithIcon' && button.selector === 'flat'"
              mat-flat-button
              class="mr-1"
              [color]="button.color"
              [disabled]="button.disabled"
              (click)="onClick(row, button.action)">
		          <mat-icon *ngIf="button.icon">
                {{button.icon}}
              </mat-icon>

              {{button.label}}
            </button>

            <button *ngIf="button.type === 'icon' && button.selector === 'flat'"
              mat-flat-button
              class="button-icon mr-1"
              [color]="button.color"
              [disabled]="button.disabled"
              (click)="onClick(row, button.action)">
              <mat-icon>{{button.icon}}</mat-icon>
            </button>

            <button *ngIf="button.type === 'rounded' && button.selector === 'flat'"
              mat-flat-button
              class="rounded-20px mr-1"
              [color]="button.color"
              [disabled]="button.disabled"
              (click)="onClick(row, button.action)">
              {{button.label}}
            </button>

            <button *ngIf="button.type === 'roundedWithIcon' && button.selector === 'flat'"
              mat-flat-button
              class="rounded-20px mr-1"
              [color]="button.color"
              [disabled]="button.disabled"
              (click)="onClick(row, button.action)">
		          <mat-icon *ngIf="button.icon">
                {{button.icon}}
              </mat-icon>

              {{button.label}}
            </button>
            <!-- Stroked -->
            <button *ngIf="button.type === 'basic' && button.selector === 'stroked'"
              mat-stroked-button
              class="mr-1"
              [color]="button.color"
              [disabled]="button.disabled"
              (click)="onClick(row, button.action)">
              {{button.label}}
            </button>

            <button *ngIf="button.type === 'basicWithIcon' && button.selector === 'stroked'"
              mat-stroked-button
              class="mr-1"
              [color]="button.color"
              [disabled]="button.disabled"
              (click)="onClick(row, button.action)">
		          <mat-icon *ngIf="button.icon">
                {{button.icon}}
              </mat-icon>

              {{button.label}}
            </button>

            <button *ngIf="button.type === 'icon' && button.selector === 'stroked'"
              mat-stroked-button
              class="button-icon mr-1"
              [color]="button.color"
              [disabled]="button.disabled"
              (click)="onClick(row, button.action)">
              <mat-icon>{{button.icon}}</mat-icon>
            </button>

            <button *ngIf="button.type === 'rounded' && button.selector === 'stroked'"
              mat-stroked-button
              class="rounded-20px mr-1"
              [color]="button.color"
              [disabled]="button.disabled"
              (click)="onClick(row, button.action)">
              {{button.label}}
            </button>

            <button *ngIf="button.type === 'roundedWithIcon' && button.selector === 'stroked'"
              mat-stroked-button
              class="rounded-20px mr-1"
              [color]="button.color"
              [disabled]="button.disabled"
              (click)="onClick(row, button.action)">
		          <mat-icon *ngIf="button.icon">
                {{button.icon}}
              </mat-icon>

              {{button.label}}
            </button>
          </ng-container>
        </td>
      </ng-container>

      <ng-container matColumnDef="no-content">
        <th *matHeaderCellDef
          [colSpan]="displayColumns.length"> No Data </th>
      </ng-container>

      <tr mat-header-row
        *matHeaderRowDef="displayColumns"></tr>

      <tr mat-header-row
        class="no-content"
        *matHeaderRowDef="['no-content']"
        [style.display]="(table.totalData === 0) ? 'table-row' : 'none'"></tr>

      <tr mat-row
        *matRowDef="let row; columns: displayColumns;"></tr>
    </table>

    <ng-template #defaultAvatar>
      <img src="../common/assets/avatar.png">
    </ng-template>
  `
})
export class TableComponent implements OnInit {
	@ViewChild(MatSort, { static: false })
	public matSort!: MatSort;

	public displayColumns!: string[];

	@Input()
	public table!: TableModel;

	@Output()
	public nextAction: EventEmitter<any>;

	constructor() {
		this.nextAction = new EventEmitter();
	}

	ngOnInit() {
		this.setDisplayColumn();
	}

	public sort() {
		this.table.dataSource.sort = this.matSort;
	}

	private setDisplayColumn() {
		this.displayColumns = this.table.columns.reduce((result, each) => {
			result.push(each.value);
			return result;
		}, []);

		if (this.table.isSequence) {
			this.displayColumns = ['no', ...this.displayColumns];
		}
		if (this.table.actions.length > 0) {
			this.displayColumns = [...this.displayColumns, 'actions'];
		}
	}

	public onClick(row: any, action: any) {
		if (!row) {
			return;
		}

		this.nextAction.emit({
			row: row,
			action: action,
		});
	}
}
