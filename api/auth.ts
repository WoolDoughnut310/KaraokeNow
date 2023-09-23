import type { VercelResponse, VercelRequest } from "@vercel/node";
import { client, redirectUri } from "./_authClient";

const authorizationUrl = client.authorizeURL({
  redirect_uri: redirectUri,
});

export default async (req: VercelRequest, res: VercelResponse) => {
  res.redirect(authorizationUrl);
};
