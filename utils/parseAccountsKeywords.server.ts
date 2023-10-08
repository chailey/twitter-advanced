import { AccountData, FilterData, FilterTypes, KeywordData } from "@/types/types"

export const parseAccountsKeywords = (accounts: AccountData[], keywords: KeywordData[], filters: FilterData) => {
  let finalString = ""
  for (let i = 0; i < keywords.length; i++) {
    if (i != 0) {
      finalString += keywords[i].operator + " "
    }
    if (keywords[i].isNot) {
      finalString += "-"
    }
    finalString += keywords[i].keywordValue + " "
  }

  for (let i = 0; i < accounts.length; i++) {
    finalString += "("
    if (accounts[i].operator  == 'mention') {
      finalString += accounts[i].accountValue.substring(0,1) == '@' ? accounts[i].accountValue : '@' + accounts[i].accountValue
    } else {
      finalString += accounts[i].operator + ":"
      finalString += accounts[i].accountValue.substring(0,1) == '@' ? accounts[i].accountValue : '@' + accounts[i].accountValue
    }
    finalString += ") "
  }
  if (filters.replies != FilterTypes.Default) {
    filters.replies == FilterTypes.None ? finalString += "-filter:replies " : finalString += "filter:replies "
  }

  if (filters.retweets != FilterTypes.Default) {
    filters.retweets == FilterTypes.None ? finalString += "-filter:retweets " : finalString += "filter:retweets "
  }

  if (filters.links != FilterTypes.Default) {
    filters.links == FilterTypes.None ? finalString += "-filter:links " : finalString += "filter:links "
  }

  if (filters.media == FilterTypes.None) {
    finalString += "-filter:media "
  } else {
    if (filters.media == FilterTypes.Only) {
      finalString += "filter:media "
    }
    if (filters.images != FilterTypes.Default) {
      filters.images == FilterTypes.None ? finalString += "-filter:images " : finalString += "filter:images "
    }
    if (filters.videos != FilterTypes.Default) {
      filters.videos == FilterTypes.None ? finalString += "-filter:videos " : finalString += "filter:videos "
    }
  }

  return finalString
}