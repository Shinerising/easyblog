export interface Contents {
  repo: {
    content: {
      entries: Array<Content>
    }
  };
}

export interface Content {
  name: string;
  type: string;
  oid: string;
  commitedDate: Date;
}
