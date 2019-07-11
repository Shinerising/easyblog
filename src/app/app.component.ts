import { Component } from '@angular/core';
import * as marked from 'marked';
import { Contents } from './interface/content.interface';
import { Config } from './class/config.class'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public header:string = '';

  constructor() {
      Config.Instance = new Config();
      Config.Instance.User = "Shinerising";
      Config.Instance.Repo = "MyArticles";
      Config.Instance.Path = "Articles";
      Config.Instance.Title = 'Apollo\'s Blog';

      this.header = Config.Instance.Title;
  }
}
