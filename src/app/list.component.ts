import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Contents, Content } from './interface/content.interface';
import { Config } from './class/config.class';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  public contentList:Array<Content>;
  public imageRootUri:string;

  constructor(
    private title: Title,
    private apollo: Apollo) {
      this.title.setTitle(Config.Instance.Title);
      this.imageRootUri = Config.Instance.getRAWRoot;
      this.LoadContents();
  }

  private async LoadContents() {
    let response = await this.apollo.query<Contents>({query : gql(Config.Instance.getContentQuery())}).toPromise();
    let contents:Contents = response.data;
    this.contentList = contents.repo.content.entries.filter((content) => {
      if(content.type === 'blob'){
        let extension:string = content.name.substr(content.name.lastIndexOf('.')).toLowerCase();
        if(extension === '.md' || extension === '.markdown'){
          return content;
        }
      }
    });
  }
}
