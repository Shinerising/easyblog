import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from './service/http.service'
import { Title } from '@angular/platform-browser';
import { Content, Contents } from './interface/content.interface';
import { Commits, Commit } from './interface/commit.interface';
import { FileNamePipe } from './pipe/filename.pipe'
import { Config } from './class/config.class';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import * as marked from 'marked';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  public commitList:Array<Commit>;
  public header: string;
  public author: string = "获取中...";
  public updateTime: Date;
  public url:string;
  public html:string;
  public email:string;
  public avatar:string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpService,
    private title: Title,
    private apollo: Apollo) {
  }

  ngOnInit(): void {
    this.subscription = this.route.fragment.subscribe(fragment => {
      if(fragment===null){
        this.router.navigateByUrl('');
      } else {
        this.header = new FileNamePipe().transform(fragment);
        this.title.setTitle(this.header);
        this.LoadCommits(fragment)
        this.LoadArticle(fragment)
      }
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private async LoadCommits(file:string) {
    let response = await this.apollo.query<Commits>({query : gql(Config.Instance.getCommitQuery(file))}).toPromise();
    let commits:Commits = response.data;
    this.commitList = commits.repo.content.history.edges;
    this.author = this.commitList[0].commit.committer.name;
    this.updateTime = this.commitList[0].commit.committer.date;
    this.email = this.commitList[0].commit.committer.email;
    this.avatar = this.commitList[0].commit.committer.avatarUrl;

    this.url = this.commitList[0].commit.commitUrl;
  }

  private async LoadArticle(file:string) {
    let data:string = await this.http.getMarkdown(Config.Instance.getMarkDownURL(file));
    marked.setOptions({
      baseUrl: Config.Instance.getRAWRoot
    })
    this.html = marked(data);
  }
}
