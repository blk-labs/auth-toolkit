import { HttpHandler, http, HttpResponse, type PathParams } from "msw";
import usersData from "../data/users.json";
export const refreshHandler: HttpHandler = http.post<
  PathParams,
  { currentToken: string }
>("/api/auth/refresh", async ({ request }) => {
  const body = await request.json();
  const { currentToken } = body;

  if (!currentToken) {
    return HttpResponse.json({ message: "unauthorized", status: 401 });
  }

  const decrypted = currentToken.split(".");
  const userId = decrypted[1];

  const currentUser = usersData.find((el) => el.id === userId);

  if (!currentUser) {
    return HttpResponse.json({ message: "User not found", status: 400 });
  }

  const { password, ...rest } = currentUser;

  const newToken = `mock-token.${String(userId)}.${Date.now().toString()}`;

  return HttpResponse.json({
    message: "success",
    status: 200,
    data: { accessToken: newToken, user: rest },
  });
});
