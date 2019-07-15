export interface Commit {
  commit: {
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
