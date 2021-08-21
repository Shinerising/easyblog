export interface Commit {
  commit: {
    oid: string;
    commitUrl: string,
    committedDate: Date,
    committer: {
      name: string,
      email: string,
      avatarUrl: string,
      date: Date
    }
  };
}
export interface Commits {
  repo: {
    content: {
      history: {
        edges: Array<Commit>
      }
    }
  };
}
