import axios from "axios";
import * as cheerio from "cheerio";

const apiHost = process.env.GENIUS_HOST as string;

const constructHeaders = (accessToken: string) => ({
    Authorization: `Bearer ${accessToken}`,
});

export const search = async (accessToken: string, q: string) => {
    const response = await axios.get(`${apiHost}/search`, {
        params: {
            q,
        },
        headers: constructHeaders(accessToken),
    });
    const data = response.data;

    if (data.meta.status !== 200) {
        throw new Error(data.meta.message);
    }

    const hits = data.response.hits;

    const firstHit = hits.find((hit: any) => hit.type === "song");

    if (!firstHit) {
        throw new Error("No song found");
    }

    return firstHit.result;
};

export const extractLyrics = async (url: string) => {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const lyricsContainer = $('[data-lyrics-container="true"]');

    // Replace <br> with newline
    $("br", lyricsContainer).replaceWith("\n");

    // Replace the elements with their text contents
    $("a", lyricsContainer).replaceWith((_i, el) => $(el).text());

    // Remove all child elements, leaving only top-level text content
    lyricsContainer.children().remove();

    return lyricsContainer.text();
};
