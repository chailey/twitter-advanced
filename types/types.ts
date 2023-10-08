

export enum AccountOperators {
  From = "from",
  To = "to",
  Mention = "mention"
}

export type AccountData = {
  operator: AccountOperators;
  accountValue: string; 
}


export enum KeywordOperators {
  AND = "AND",
  OR = "OR",
} 

export type KeywordData = {
  operator: KeywordOperators;
  keywordValue: string;
  isNot: boolean; 
}

export enum FilterTypes {
  None = "None",
  Default = "Default",
  Only = "Only"
}

export enum Filters {
  Replies = "replies",
  Retweets = "retweets",
  Links = "links",
  Media = "media",
  Images = "images",
  Videos = "videos",
}

export type FilterData = {
  replies: FilterTypes,
  retweets: FilterTypes,
  links: FilterTypes,
  media: FilterTypes,
  images: FilterTypes,
  videos: FilterTypes,
}

export type FormData = {
  accounts: AccountData[];
  keywords: KeywordData[];
  filters: FilterData;
}