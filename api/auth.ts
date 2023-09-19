import type { VercelResponse, VercelRequest } from "@vercel/node";
import { client } from "./_authClient";

const redirectUri = `https://localhost:3000/auth/callback`;

const authorizationUrl = client.authorizeURL({
  redirect_uri: redirectUri,
});

export default async (req: VercelRequest, res: VercelResponse) => {
  res.redirect(authorizationUrl);
};
