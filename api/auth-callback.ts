import type { VercelResponse, VercelRequest } from "@vercel/node";
import { client, redirectUri } from "./_authClient";
const cookie = require("cookie");

export default async (req: VercelRequest, res: VercelResponse) => {
  const { code } = req.query;

  const options = {
    code: code as string,
    redirect_uri: redirectUri,
  };

  const token = await client.getToken(options);
  const accessToken = token.token.access_token as string;

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("accessToken", accessToken, { path: "/" })
  );
  res.redirect("/");
};
