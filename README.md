# pwn-check

`pwn-check` is a simple command line utility for checking the current anonymity of your passwords.

The check is handled through [haveibeenpwned](https://haveibeenpwned.com/Passwords), if you're uncertain about having your passwords checked by a server please read this [Troy Hunt Article](https://www.troyhunt.com/ive-just-launched-pwned-passwords-version-2/#cloudflareprivacyandkanonymity) to alleviate your worries, or read through [password-checker.ts](src/password-checker.ts) to see how your password is used.

## Usage

Simply download the repo and run `npm i && npm start -- [ARGS]`, this requires `tsc` to be accessible to compile the typescript source. Because the compilation/running is handled through an npm script the `--` is required to separate between arguments for `npm` and arguments for `pwn-check`.

The current ways to check passwords are:

`npm start -- PASSWORD1 PASSWORD2 ...` will check each password provided, you can provide as many of these as you want. Because we have no other identifier here than the password itself using pwn-check this way will print your passwords to the screen if they are found.

![Password argument example](images/password-example.png?raw=true)

`npm start -- --lastpass` will prompt you for your lastpass email/password (and a 2FA pin if required) and check the password for each site in your vault it finds. Instead of printing passwords here, we use the `name` of the site that's being checked. To see how your email/password are used read through [lastpass.ts](src/password-getters/lastpass.ts) and the [lastpass-node library](https://github.com/dfrankland/lastpass-node/tree/v1.0.3).

![Lastpass argument example](images/lastpass-example.png?raw=true)

## Goals

Ideally I would like to add support to all of the popular password managers currently in use, if there's one missing here and in the issues list feel free to file an issue or make a PR for it yourself for me to look at. I intend to get around to them as and when I have time but as a lastpass user they are not going to be my highest priority.
