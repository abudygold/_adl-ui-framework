import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'rupiah' })
export class RupiahPipe implements PipeTransform {
	public transform(value: number, format: string = 'Rp'): string {
		value = value && value > 0 ? value : 0;

		const splitValue = value.toString().split('.');

		if (splitValue.length > 1) {
			return format + ' ' + splitValue[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ',' + splitValue[1];
		}

		return format + ' ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
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
