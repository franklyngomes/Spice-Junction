import fs from "fs";
import { google } from "googleapis";
const credentials = JSON.parse(process.env.WEB_OBJECT);
const token = JSON.parse(process.env.GOOGLE_TOKEN);
const { client_secret, client_id, redirect_uris } = credentials;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
oAuth2Client.setCredentials(token);
export async function sendMail(to, subject, html) {
    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });
    const rawMessage = [
        `From: "Spice Junction" <franklyngomes15@gmail.com>`,
        `To: ${to}`,
        `Subject: ${subject}`,
        "MIME-Version: 1.0",
        "Content-Type: text/html; charset=UTF-8",
        "",
        html,
    ].join("\n");
    const encodedMessage = Buffer.from(rawMessage)
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
    await gmail.users.messages.send({
        userId: "me",
        requestBody: { raw: encodedMessage },
    });
}
//# sourceMappingURL=GoogleMail.js.map