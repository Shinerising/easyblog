import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface Config {
  User: string;
  Repo: string;
  Path: string;
  Title: string;
  RAWRoot: string;
  Theme: string;
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService implements Config {
  public User: string;
  public Repo: string;
  public Path: string;
  public Title = 'Blog';
  public RAWRoot = `https://raw.githubusercontent.com`;
  public Theme: string;

  public getMarkDownURL(filename: string = ''): string {
    return `${this.RAWRoot}/${this.User}/${this.Repo}/master/${this.Path}/${filename}`;
  }
  public getRAWRoot(): string {
    return `${this.RAWRoot}/${this.User}/${this.Repo}/master/${this.Path}/`;
  }
  public getRepoURL(): string {
    return `https://github.com/${this.User}/${this.Repo}`;
  }
  public getFileURL(file: string): string {
    return `https://github.com/${this.User}/${this.Repo}/blob/master/${this.Path}/${file}`;
  }
  public getContentQuery(): string {
    return `
      query getContent {
        repo:repository(owner: "${this.User}", name: "${this.Repo}") {
          content: object(expression: "master:${this.Path}") {
            ... on Tree {
              entries {
                name
                type
                oid
              }
            }
          }
        }
      }
    `;
  }
  public getCommitQuery(file: string): string {
    const path = this.Path ? this.Path + '/' + file : file;
    return `
      query getCommit {
        repo:repository(owner: "${this.User}", name: "${this.Repo}") {
          content: object(expression: "master") {
            ... on Commit {
              history(path: "${path}", first:1) {
                edges {
                  commit: node {
                    oid
                    commitUrl
                    committedDate
                    committer {
                      name
                      date
                      email
                      avatarUrl
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;
  }

  constructor(private injector: Injector) {
  }

  public async loadConfig() {
    const http = this.injector.get(HttpClient);
    const config = await firstValueFrom(http.get<Config>('./assets/config.json'));
    this.User = config.User || this.User;
    this.Repo = config.Repo || this.Repo;
    this.Path = config.Path || this.Path;
    this.Title = config.Title || this.Title;
    this.RAWRoot = config.RAWRoot || this.RAWRoot;
    this.Theme = config.Theme || this.Theme;
  }
}
