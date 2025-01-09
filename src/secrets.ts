import dotenv from "dotenv";
dotenv.config({ path: ".env" });

export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET;
export const LEETCODE_BASE_URL = process.env.LEETCODE_BASE_URL;
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
