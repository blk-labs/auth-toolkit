import { AuthManager, WebStorageTokenStore } from "@auth-toolkit/core";
import { Identifier } from "./constants";
import axios from "axios";

const storage = new WebStorageTokenStore(
  Identifier.storageKey,
  Identifier.store,
);
export const authManager = new AuthManager<User>(storage, {
  onRefresh: async (currentToken) => {
    const res = await axios.post("/api/auth/refresh", { currentToken });
    const data = await res.data.data;

    console.log(data)

    return {
      accessToken: data.accessToken,
      user: data.user,
    };
  },
});
