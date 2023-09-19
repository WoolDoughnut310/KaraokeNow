import { AuthorizationCode } from "simple-oauth2";

export const client = new AuthorizationCode({
    client: {
        id: process.env.GENIUS_CLIENT_ID as string,
        secret: process.env.GENIUS_CLIENT_SECRET as string,
    },
    auth: {
        tokenHost: process.env.GENIUS_HOST as string,
        tokenPath: "/oauth/token",
        authorizePath: "/oauth/authorize",
    },
});
