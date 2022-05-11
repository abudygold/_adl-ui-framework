import { TestBed, inject } from '@angular/core/testing';

import { RupiahPipe } from './rupiah.pipe';

describe('Pipe: Rupiah', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [RupiahPipe]
		});
	});

	it('should has default transform value when null', inject([RupiahPipe], (rupiah: RupiahPipe) => {
		expect(rupiah.transform(null)).toBe('Rp 0');
	}));

	it('should has default transform value when negative', inject([RupiahPipe], (rupiah: RupiahPipe) => {
		expect(rupiah.transform(-10000)).toBe('Rp -10000');
	}));

	it('should transform to \'Rp XX.XXX\' format', inject([RupiahPipe], (rupiah: RupiahPipe) => {
		expect(rupiah.transform(10000)).toBe('Rp 10.000');
	}));
});
