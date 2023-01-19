import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import input from "input";
import { NewMessage, NewMessageEvent } from "telegram/events";
import config from "./config";

const apiId = config.API_ID;
const apiHash = config.API_HASH;

const stringSession = new StringSession(""); // fill this later with the value from session.save()

(async () => {
  console.log("Loading interactive example...");
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
  await client.start({
    phoneNumber: async () => await input.text("Please enter your number: "),
    password: async () => await input.text("Please enter your password: "),
    phoneCode: async () =>
      await input.text("Please enter the code you received: "),
    onError: (err) => console.log(err),
  });
  console.log("You should now be connected.");
  console.log(client.session.save()); // Save this string to avoid logging in again
  await client.sendMessage("me", { message: "Hello!" });

  async function handler(event: NewMessageEvent) {
    console.log({
      event: event,
    });
  }
  client.addEventHandler(handler, new NewMessage({}));
})();
