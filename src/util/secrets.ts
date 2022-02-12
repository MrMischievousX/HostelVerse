import logger from "./logger";
import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env")) {
    logger.debug("Using .env file to supply config environment variables");
    dotenv.config({ path: ".env" });
} else {
    logger.debug("Using .env.example file to supply config environment variables");
    dotenv.config({ path: ".env.example" });  // you can delete this after you create your own .env file!
}
export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === "production"; // Anything else is treated as 'dev'

export const MONGODB_URI = prod ? process.env["MONGODB_URI"] : process.env["MONGODB_URI_LOCAL"];

export const MAP_QUEST_KEY = process.env["MAP_QUEST_KEY"];

export const REDIS_HOSTNAME = process.env["REDIS_HOSTNAME"];
export const REDIS_PASSWORD = process.env["REDIS_PASSWORD"];
export const REDIS_PORT = process.env["REDIS_PORT"];
export const SENDGRID_API_KEY = process.env["SENDGRID_API_KEY"];
if(!SENDGRID_API_KEY){
    logger.error("SENDGRID_API_KEY is not set");
    process.exit(1);
}
// export const SENDGRID_USER = process.env["SENDGRID_USER"];
// export const SENDGRID_PASSWORD = process.env["SENDGRID_PASSWORD"];
// export const GMAIL_EMAIL = process.env["GMAIL_EMAIL"];
// export const GMAIL_PSSWD = process.env["GMAIL_PSSWD"];

export const JWT_SECRET = process.env["JWT_SECRET"];
if(!JWT_SECRET) {
    logger.error("No JWT_SECRET environment variable. Set and restart server.");
    process.exit(1);
}

if (!MONGODB_URI) {
    if (prod) {
        logger.error("No mongo connection string. Set MONGODB_URI environment variable.");
    } else {
        logger.error("No mongo connection string. Set MONGODB_URI_LOCAL environment variable.");
    }
    process.exit(1);
}
