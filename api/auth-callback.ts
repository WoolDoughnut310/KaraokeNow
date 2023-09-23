import type { VercelResponse, VercelRequest } from "@vercel/node";
import { client, redirectUri } from "./_authClient";

export default async (req: VercelRequest, res: VercelResponse) => {
  const { code } = req.query;

  const options = {
    code: code as string,
    redirect_uri: redirectUri,
  };

  const token = await client.getToken(options);
  const accessToken = token.token.access_token;

  res.setHeader("Set-Cookie", `accessToken=${accessToken}`);
  res.status(200).json(token.token.access_token);
};
