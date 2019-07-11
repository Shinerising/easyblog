export class Config {
  public static Instance:Config;

  public User:string;
  public Repo:string;
  public Path:string;
  public Title:string;
  public RAWRoot:string = `https://gitcdn.xyz/cdn`;
  
  public getMarkDownURL(filename:string = ''):string{
    return `${this.RAWRoot}/${this.User}/${this.Repo}/master/${this.Path}/${filename}`;
  }
  public get getRAWRoot():string{
    return `${this.RAWRoot}/${this.User}/${this.Repo}/master/${this.Path}/`;
  }
  public getContentQuery():string{
    return `
      query getContent {
        repo:repository(owner: "${this.User}", name: "${this.Repo}") {
          content: object(expression: "master:${this.Path}") {
            ... on Tree {
              entries {
                name
                type
              }
            }
          }
        }
      }
    `;
  }
  public getCommitQuery(file:string):string{
    return `
      query getCommit {
        repo:repository(owner: "${this.User}", name: "${this.Repo}") {
          content: object(expression: "master") {
            ... on Commit {
              history(path: "${this.Path}/${file}", first:1) {
                edges {
                  commit: node {
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
}

