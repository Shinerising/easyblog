import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'sanitizeHTML' })
export class SanitizehtmlPipe implements PipeTransform {

	constructor(
		private _sanitizer: DomSanitizer) {
	}

	transform(value: string, exponent?: string): SafeHtml {
		const data = value || '';
		return this._sanitizer.bypassSecurityTrustHtml(data);
	}
}