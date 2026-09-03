import arcjet, { shield,detectBot, slidingWindow, fixedWindow, protectSignup } from "@arcjet/next";
import { env } from "./env";

export {shield, detectBot, slidingWindow,fixedWindow, protectSignup}

export default arcjet({
  key: env.ARCJET_KEY,
  characteristics : ["fingerprint"],
  rules: [
    shield({
      mode: "LIVE",
    }),
  ],
});