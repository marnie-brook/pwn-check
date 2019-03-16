import { Password } from "./password";
import { checkPassword } from "./password-checker";
import { getPasswords } from "./password-getter";

console.log("----------------------------------------------------------------------------");
console.log("| Checking passwords. Only found passwords will be printed to the console. |");
console.log("----------------------------------------------------------------------------");

getPasswords().then((passwords) => {
  console.log(`Checking ${passwords.length} passwords`);
  passwords.forEach(
    (password) => checkPassword(password.password).then((r) => {
      if (r === null) {
        return;
      }
      console.log(`- '${password.identifier}' has been seen ${r.count} times!`);
    }).catch((e) => {
      console.log("An error occured trying to check a password");
    })
  )
});
