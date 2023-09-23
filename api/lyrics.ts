import type { VercelResponse, VercelRequest } from "@vercel/node";
import { search, extractLyrics } from "./_genius";

export default async (req: VercelRequest, res: VercelResponse) => {
  const { q } = req.query;
  const accessToken = req.cookies.accessToken;

  const song = await search(accessToken, q as string);
  const lyrics = await extractLyrics(song.url);

  res.status(200).json(lyrics);
};
