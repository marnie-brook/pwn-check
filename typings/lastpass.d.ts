declare namespace lastpass {
  class Lastpass {
    constructor(username: string);
    loadVault(username: string, password: string, twoFactor?: string): Promise<void>;
    loadVaultFile(vaultFile?: string): Promise<void>;
    saveVaultFile(vaultFile?: string, options?: object): Promise<void>;
    getVault(): Buffer;
    getAccounts(username: string, password: string, search?: object): Promise<Array<{id: string, name: string, group: string, url: string, notes: string, username: string, password: string, secureNote: boolean}>>;

    username: string;
  }

  class LastpassError extends Error {
    constructor(input: { title: string, body: object });

    name: "LastpassError";
    title: string;
    body: object;
  }
}
