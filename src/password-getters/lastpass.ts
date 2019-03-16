import { Password } from "./../password";
const Lastpass = require("lastpass").default;

import * as readline from "readline-sync";

interface Account {
  name: string;
  password: string;
}

function getUserInput(prompt: string): string {
  const answer = readline.question(`${prompt}: `);
  return answer;
}

function getHiddenUserInput(prompt: string): string {
  const answer = readline.question(`${prompt}: `, {
    hideEchoBack: true
  });
  return answer;
}

async function getAccounts(
  lp: lastpass.Lastpass,
  email: string,
  password: string
): Promise<Array<Account>> {
  // Get the users vault
  try {
    await lp.loadVault(email, password);
  } catch (e) {
    if (e && e.body && e.body.cause === "googleauthrequired") {
      await lp.loadVault(email, password, getUserInput("2FA Code"));
    } else {
      throw e;
    }
  }

  // Ensure the vault is loaded
  try {
    lp.getVault();
  } catch (e) {
    console.log("Could not load lastpass vault");
  }

  const accounts = await lp.getAccounts(email, password);
  return new Promise((resolve) => resolve(accounts as Array<Account>));
}

function trimString(password: string): string {
  while (true) {
    const codePoint = password.codePointAt(password.length - 1);
    if (codePoint && codePoint < 33) {
      password = password.substring(0, password.length - 1);
    } else {
      return password;
    }
  }
}

async function getPasswords(
  lp: lastpass.Lastpass,
  email: string,
  password: string
) {
  const accounts = await getAccounts(lp, email, password);
  const passwords = accounts.map((account) => {
    return new Password(trimString(account.name), trimString(account.password));
  });
  return passwords;
}

export async function getLastpassPasswords(): Promise<Array<Password>> {
  const email = getUserInput("email");
  const password = getHiddenUserInput("password");
  const lp = new Lastpass(email);
  try {
    const passwords: Array<Password> = await getPasswords(
      lp,
      email,
      password
    );
    return passwords;
  } catch (e) {
    console.log("Error accessing lastpass vault");
    console.log(e);
  }
  return [];
}
