import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'decimalNumber',
})
export class DecimalNumberPipe implements PipeTransform {
	public transform(value: number): string {
		value = value && value > 0 ? value : 0;

		return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
	}

	public parse(value: string): string {
		return value
			.toString()
			.split('.')
			.join('')
			.split(',')
			.join('')
			.split(' ')
			.join('')
			.replace('R', '')
			.replace('p', '');
	}
}
