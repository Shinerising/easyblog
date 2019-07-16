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

  public header: string;
  public author: string;
  public updateTime: Date;
  public url: string;
  public html: string;
  public email: string;
  public avatar: string;
  public error: boolean;

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
    const commitList = commits.repo.content.history.edges;
    if (commitList && commitList.length > 0) {
      const committer = commitList[0].commit.committer;
      this.author = committer.name;
      this.updateTime = committer.date;
      this.email = committer.email;
      this.avatar = committer.avatarUrl;
      this.url = this.config.getFileURL(file);
      this.error = false;
    } else {
      this.error = true;
    }
  }

  private async LoadArticle(file: string) {
    const data = await this.http.getMarkdown(this.config.getMarkDownURL(file));
    this.html = this.markdown.render(data);
  }
}
