
import { TwitterRecord } from './schema';

export function parseTweet(payload: TwitterRecord) {
  payload.tweet = JSON.parse(payload.tweet);
  return payload;
}
