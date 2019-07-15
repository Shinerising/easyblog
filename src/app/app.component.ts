import { Component, Inject } from '@angular/core';
import { AppConfig } from './class/config.class';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public header: string;
  public url: string;

  constructor(
    @Inject(DOCUMENT) private document,
    private config: AppConfig) {
      this.header = config.Title;
      this.url = config.getRepoURL();
      if (config.Theme) {
        const link: HTMLLinkElement = this.document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', `./assets/${config.Theme}.css`);
        this.document.head.appendChild(link);
      }
  }
}
