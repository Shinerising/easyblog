import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from './service/http.service';
import { Title } from '@angular/platform-browser';
import { Commits, Commit } from './interface/commit.interface';
import { FileNamePipe } from './pipe/filename.pipe';
import { Apollo } from 'apollo-angular';
import { AppConfig } from './class/config.class';
import { MarkDownService } from './service/markdown.service';
import gql from 'graphql-tag';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  public commitList: Array<Commit>;
  public header: string;
  public author: string;
  public updateTime: Date;
  public url: string;
  public html: string;
  public email: string;
  public avatar: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpService,
    private title: Title,
    private apollo: Apollo,
    private markdown: MarkDownService,
    private config: AppConfig) {
  }

  ngOnInit(): void {
    this.subscription = this.route.fragment.subscribe(fragment => {
      if (fragment === null) {
        this.router.navigateByUrl('');
      } else {
        this.header = new FileNamePipe().transform(fragment);
        this.title.setTitle(this.header);
        this.LoadCommits(fragment);
        this.LoadArticle(fragment);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private async LoadCommits(file: string) {
    const response = await this.apollo.query<Commits>({query : gql(this.config.getCommitQuery(file))}).toPromise();
    const commits: Commits = response.data;
    this.commitList = commits.repo.content.history.edges;
    this.author = this.commitList[0].commit.committer.name;
    this.updateTime = this.commitList[0].commit.committer.date;
    this.email = this.commitList[0].commit.committer.email;
    this.avatar = this.commitList[0].commit.committer.avatarUrl;

    this.url = this.commitList[0].commit.commitUrl;
  }

  private async LoadArticle(file: string) {
    const data = await this.http.getMarkdown(this.config.getMarkDownURL(file));
    this.html = this.markdown.render(data);
  }
}
