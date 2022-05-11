# ADL UI Framework

[![Downloads](https://img.shields.io/npm/dm/adl-ui-framework.svg)](https://www.npmjs.com/package/adl-ui-framework) [![Version](https://img.shields.io/npm/v/adl-ui-framework.svg)](https://www.npmjs.com/package/adl-ui-framework)

> Axiata Digital Labs Indonesia Design System.
- [Website](https://abudygold.github.io/adl-ui-framework)

## Features

- Search UI
- Table UI
- Base Service
- Icon Service
- Input Currency Directive
- Only Number Directive
- Decimal Number Pipe
- Currency Pipe (Rupiah)
- Safe Pipe (HTML | Style | URL | Resource URL)
- Base Model
  - HTTP Body Request Pagination Model
  - HTTP Body Request Pagination with Filter Model
  - HTTP Body Resp Model
  - Upload File Request Model
- Util
  - HTTP Param Generator
- Styles
  - Bootstrap v5.1.3 (https://getbootstrap.com/)
  - Component
    - Accordion | Alert | Avatar | Breadcrumb | Button | Checbox | Input | Search | Typography

## Getting started

### Installation

```shell
npm i adl-ui-framework
```

```css
/* Import style to styles.scss */
@import '../../node_modules/adl-ui-framework/adl-ui-framework.styles.scss';
```

### Usage

#### Example

```html
<adl-table [table]="table"
			(nextAction)="clickedButton($event)"></adl-table>
```

```typescript
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService, TableButtonModel, TableModel } from 'adl-ui-framework';
import { Subscription } from 'rxjs';
import {
	ViewListTableColumnConst,
	ViewListTableLabelConst,
} from '../../shared/const';
import { UserModel } from '../../shared/model';

@Component({
	selector: 'app-adl-library-view-list',
	templateUrl: './adl-library-view-list.component.html',
	styleUrls: ['./adl-library-view-list.component.scss'],
})
export class ADLLibraryViewListComponent implements OnInit, OnDestroy {
	public isLoading!: boolean;
	public table!: TableModel;

	private subscribers: Subscription[] = [];

	constructor(private router: Router, private baseService: BaseService) {}

	ngOnInit(): void {
		this.isLoading = false;
		this.subscribers = [];

		this.initTable();
		this.getViewListService();
	}

	private initTable(): void {
		const editButton = new TableButtonModel(
			'Edit',
			'edit',
			'flat',
			'icon',
			'primary',
			false,
			'edit'
		);
		const deleteButton = new TableButtonModel(
			'Delete',
			'delete',
			'stroked',
			'icon',
			'warn',
			false,
			'delete'
		);

		this.table = new TableModel(
			[],
			0,
			ViewListTableColumnConst,
			ViewListTableLabelConst,
			1,
			10,
			[editButton, deleteButton],
			true
		);
	}

	private getViewListService(): void {
		this.isLoading = true;

		const url =
			UserViewListServicePathConst +
			'?page=' +
			this.table.page +
			'&limit=' +
			this.table.pageSize;

		const subs = this.baseService
			.getDataPaging(url, UserModel)
			.subscribe(resp => {
				if (resp) {
					this.table.totalData = resp.total;
					this.table.dataSource.data = resp.data;
				}

				this.isLoading = false;
			});

		this.subscribers.push(subs);
	}

	public clickedButton(event: { row: UserModel; action: string }): void {
		if (!event) {
			return;
		}

		if (event.action === 'edit') {
			this.navigateToEdit(event.row.id);
		} else if (event.action === 'delete') {
			this.deleteUserService(event.row.id);
		}
	}

	public deleteUserService(id: string): void {
		const subs = this.baseService
			.deleteData(UserViewListServicePathConst + '/' + id, null)
			.subscribe(resp => {
				if (resp) {
					this.getViewListService();
					console.log(resp);
				}
			});

		this.subscribers.push(subs);
	}

	private navigateToEdit(id: string): void {
		this.router.navigate(['/example-url/edit'], {
			queryParams: {
				id,
			},
		});
	}

	ngOnDestroy(): void {
		this.subscribers.forEach(each => each.unsubscribe());
	}
}
```

```typescript
import { TableModule } from 'adl-ui-framework';

@NgModule({
  imports: [TableModule]
})
export class ExampleModule {
}
```

## Troubleshooting

Please follow this guidelines when reporting bugs and feature requests:

1. Use [GitHub Issues](https://github.com/abudygold/adl-ui-framework/issues) board to report bugs and feature requests (not our email address)
2. Please **always** write steps to reproduce the error. That way we can focus on fixing the bug, not scratching our heads trying to reproduce it.

Thanks for understanding!
