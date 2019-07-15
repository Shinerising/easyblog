import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'sanitizeHTML' })
export class SanitizehtmlPipe implements PipeTransform {

  constructor(
    private sanitizer: DomSanitizer) {
  }

  transform(value: string, exponent?: string): SafeHtml {
    const data = value || '';
    return this.sanitizer.bypassSecurityTrustHtml(data);
  }
}
