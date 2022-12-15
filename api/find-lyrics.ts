import type { VercelResponse, VercelRequest } from "@vercel/node";
import axios from "axios";

const BASE_URL = "https://api.musixmatch.com/ws/1.1/";

const baseParams = {
    apikey: process.env.MUSIXMATCH_API_KEY as string,
    format: "json"
}

// Find the lyrics for a given track by its ISRC
export default async function (req: VercelRequest, res: VercelResponse) {
    try {
        const { isrc } = req.query;

        let response = await axios.get(BASE_URL + "track.get", {params: {
            ...baseParams,
            track_isrc: isrc
        }});

        const track = response.data.message.body.track;

        console.log("got response", track);
        res.status(200).json(track);

        response = await axios.get(BASE_URL + "track.lyrics.get", {params: {
            ...baseParams,
            track_id: track.track_id
        }});

        const lyrics = response.data.message.body.lyric.lyrics_body;

        const title = `${track.track_name} by ${track.artist_name}`;

        res.status(200).json({title, lyrics});
    } catch (err) {
        res.status(500).send(err);
    }
}
