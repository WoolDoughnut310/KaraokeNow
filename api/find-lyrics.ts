import type { VercelResponse, VercelRequest } from "@vercel/node";
import MusixMatch from "musixmatch";

const msx = new MusixMatch({
    api_key: process.env.MUSIXMATCH_API_KEY as string,
});

// Find the lyrics for a given track by its ISRC
export default async function (req: VercelRequest, res: VercelResponse) {
    try {
        const { isrc } = req.body;

        const { track } = await msx.track({
            track_isrc: isrc,
        });

        console.log("got response", track);
        res.status(200).json(track);

        const { lyrics_body } = await msx.trackLyrics({
            track_id: track,
        });

        res.status(200).json(lyrics_body);
    } catch (err) {
        res.status(500).send(err);
    }
}
