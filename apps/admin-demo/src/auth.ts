import { AuthManager, WebStorageTokenStore } from "@auth-toolkit/core";
import { Identifier } from "./constants";

const storage = new WebStorageTokenStore(
  Identifier.storageKey,
  Identifier.store,
);
export const authManager = new AuthManager<User>(storage, {});
