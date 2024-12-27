interface BskyPost {
  author: {
    avatar: string | undefined;
    displayName: string | undefined;
    handle: string | undefined;
  };
  record: BskyRecord;
}

interface BskyRecord {
  text: string | undefined;
  createdAt: string | undefined;
}
