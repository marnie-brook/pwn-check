import * as request from "request-promise-native";
import { createHash } from "crypto";

interface HashResult {
  hash: string;
  count: number;
}

async function sendRequest(hash: string) {
  const slice = hash.slice(0, 5);
  const result = await request.get({
    uri: "https://api.pwnedpasswords.com/range/" + slice
  });
  const results = result.split("\r\n").map(
    (r: string): HashResult => {
      const parts = r.split(":");
      return {
        hash: slice + parts[0].toLowerCase(),
        count: Number(parts[1])
      };
    }
  );
  return results;
}

function findMatch(
  matches: Array<HashResult>,
  hashed: string
): HashResult|null {
  const match = matches.find((m) => m.hash === hashed);
  if (match === undefined) {
    return null;
  }
  return match;
}

export async function checkPassword(password: string) {
  const hash = createHash('sha1').update(password).digest("hex");
  const matches = await sendRequest(hash);
  return findMatch(matches, hash);
}
