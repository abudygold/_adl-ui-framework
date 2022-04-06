import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class IconService {
	constructor(
		private matIconRegistry: MatIconRegistry,
		private domSanitizer: DomSanitizer
	) {}

	public registerIcons(iconList: any, folderAsset: string): void {
		this.loadIcons(iconList, folderAsset);
	}

	private loadIcons(iconKeys: any[], iconUrl: string): void {
		iconKeys.forEach(key => {
			this.matIconRegistry.addSvgIcon(
				key.name,
				this.domSanitizer.bypassSecurityTrustResourceUrl(
					`${iconUrl}/${key.location}`
				)
			);
		});
	}
}
