import type { VercelResponse, VercelRequest } from "@vercel/node";
import acrcloud from "../acrcloud";
import formidable from "formidable";

const acr = new acrcloud({
    host: process.env.ACR_HOST as string,
    access_key: process.env.ACR_ACCESS_KEY as string,
    access_secret: process.env.ACR_SECRET as string,
    data_type: "audio",
});
const form = formidable();

// Responds with a music ISRC for an uploaded sample
export default function (req: VercelRequest, res: VercelResponse) {
    try {
        form.parse(req, async (err, _fields, files) => {
            if (err) {
                throw new Error(err);
            }

            const file = files.file as any;
            const data = await acr.identify(file.filepath);
            const metadata = data.metadata;

            if (data.status.code !== 0) {
                throw new Error(data.status.msg);
            }

            if (metadata.music?.length === 0) {
                throw new Error("No music found");
            }

            const music = metadata.music[0];

            res.status(200).send(music.external_ids.isrc);
        });
    } catch (err) {
        res.status(500).send(err);
    }
}
