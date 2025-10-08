// getToken.js
import fs from "fs";
import readline from "readline";
import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

const SCOPES = ["https://www.googleapis.com/auth/gmail.send"];
const credentials = JSON.parse(process.env.WEB_OBJECT!);

const { client_secret, client_id, redirect_uris } = credentials;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

const authUrl = oAuth2Client.generateAuthUrl({
  access_type: "offline",
  scope: SCOPES,
});

console.log("Authorize this app by visiting:", authUrl);

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question("Enter the code from that page: ", async (code) => {
  const { tokens } = await oAuth2Client.getToken(code);
  fs.writeFileSync("token.json", JSON.stringify(tokens));
  console.log("Token stored to token.json");
  rl.close();
});

