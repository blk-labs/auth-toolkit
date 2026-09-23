import { type HttpHandler, http, HttpResponse } from "msw";
import usersData from "../data/users.json";

const A_DAY = 24 * 60 * 60 * 1000;

export const sessionHandler: HttpHandler = http.get(
  "/api/session",
  async ({ request }) => {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader) {
      return HttpResponse.json({ message: "Invalid token", status: 401 });
    }

    const token = authHeader.replace(/^Bearer\s+/i, "");

    const decrypted = token.split(".");
    const userId = decrypted[1];
    const tokenTimeStamp = Number(decrypted[2]);

    if (!userId || !tokenTimeStamp) {
      return new HttpResponse({ message: "Invalid token", status: 401 });
    }

    const currentTimestamp = Date.now();

    const isExpired = currentTimestamp - tokenTimeStamp > A_DAY;

    if (isExpired) {
      return HttpResponse.json({
        message: "Token expired. Please login again.",
        status: 401,
      });
    }

    const currentUser = usersData.find((el) => el.id === userId);

    if (!currentUser) {
      return HttpResponse.json({ message: "User not found", status: 404 });
    }

    const { password, ...rest } = currentUser;

    return HttpResponse.json({
      message: "success",
      status: 200,
      data: { user: { ...rest } },
    });
  },
);
