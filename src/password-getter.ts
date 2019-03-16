import { Password } from "./password";
import { getLastpassPasswords } from "./password-getters/lastpass";

const LASTPASS_ARGUMENT = "--lastpass";

function requiresLastpass(args: Array<string>): boolean {
  return args.find((x) => x === LASTPASS_ARGUMENT) !== undefined;
}

export async function getPasswords(): Promise<Array<Password>> {
  const args = process.argv.slice(2);
  if (requiresLastpass(args)) {
    console.log("Getting passwords from lastpass");
    return getLastpassPasswords();
  }
  return args.map((pw) => {
    return new Password(pw, pw);
  });
}
