import type { VercelResponse, VercelRequest } from "@vercel/node";
import { readFile } from "fs/promises";
const acrcloud = require("acrcloud");
const formidable = require("formidable-serverless");

const acr = new acrcloud({
    host: process.env.ACR_HOST as string,
    access_key: process.env.ACR_ACCESS_KEY as string,
    access_secret: process.env.ACR_SECRET as string,
    data_type: "audio",
});
const form = formidable();

// Responds with a music ISRC for an uploaded sample
export default async function (req: VercelRequest, res: VercelResponse) {
    try {
        const { files } = await new Promise<{
            fields: any;
            files: { file: any };
        }>((resolve, reject) =>
            form.parse(
                req,
                async (
                    err: string | undefined,
                    fields: any,
                    files: { file: any }
                ) => {
                    if (err) {
                        reject(err);
                    }

                    resolve({ fields, files });
                }
            )
        );

        const file = files.file as any;
        const fileData = await readFile(file.path);
        const data = await acr.identify(fileData);
        const metadata = data.metadata;

        if (data.status.code !== 0) {
            throw new Error(data.status.msg);
        }

        if (metadata.music?.length === 0) {
            throw new Error("No music found");
        }

        const music = metadata.music[0];

        res.status(200).json(music.external_ids.isrc);
    } catch (err) {
        res.status(500).send((err as Error).message);
    }
}
