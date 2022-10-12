"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    type: "postgres",
    url: process.env.DATABASE_URL,
    migrationsTableName: "migrations",
    entities: ["dist/src/entities/*.js"],
    migrations: ["dist/src/migrations/*.js"],
    extra: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
    cli: {
        migrationsDir: "src/migrations",
        entitiesDir: "dist/src/entities/*.js"
    }
};
