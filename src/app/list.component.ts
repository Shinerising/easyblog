import { Apollo, gql } from 'apollo-angular';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Contents, Content } from './interface/content.interface';
import { ConfigService } from './service/config.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  public contentList: Array<Content>;
  public imageRootUri: string;

  constructor(
    private title: Title,
    private apollo: Apollo,
    private config: ConfigService) {
    this.title.setTitle(config.Title);
    this.imageRootUri = config.getRAWRoot();
    this.LoadContents();
  }

  private async LoadContents() {
    const entriesQuery = await firstValueFrom(this.apollo.query<Contents>({ query: gql(this.config.getContentQuery()) }));
    const contents: Contents = entriesQuery.data;
    this.contentList = contents.repo.content.entries.filter((content) => {
      if (content.type === 'blob') {
        const extension: string = content.name.substr(content.name.lastIndexOf('.')).toLowerCase();
        if (extension === '.md' || extension === '.markdown') {
          return content;
        }
      }
    });
  }
}
