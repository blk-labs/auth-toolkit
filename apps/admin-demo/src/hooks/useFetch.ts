import { useApi } from "@blk-auth-toolkit/react";

export default function useFetch() {
  const api = useApi("http://localhos");

  return { ...api };
}
