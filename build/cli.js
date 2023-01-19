"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegram_1 = require("telegram");
const sessions_1 = require("telegram/sessions");
const input_1 = __importDefault(require("input"));
const events_1 = require("telegram/events");
const config_1 = __importDefault(require("./config"));
const apiId = config_1.default.API_ID;
const apiHash = config_1.default.API_HASH;
const stringSession = new sessions_1.StringSession(""); // fill this later with the value from session.save()
(async () => {
    console.log("Loading interactive example...");
    const client = new telegram_1.TelegramClient(stringSession, apiId, apiHash, {
        connectionRetries: 5,
    });
    await client.start({
        phoneNumber: async () => await input_1.default.text("Please enter your number: "),
        password: async () => await input_1.default.text("Please enter your password: "),
        phoneCode: async () => await input_1.default.text("Please enter the code you received: "),
        onError: (err) => console.log(err),
    });
    console.log("You should now be connected.");
    console.log(client.session.save()); // Save this string to avoid logging in again
    await client.sendMessage("me", { message: "Hello!" });
    async function handler(event) {
        console.log({
            event: event,
        });
    }
    client.addEventHandler(handler, new events_1.NewMessage({}));
})();
