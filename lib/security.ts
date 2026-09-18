import {detectBot, fixedWindow, request} from "@arcjet/next"
import arcjet from "./arcjet"

export const standardProtection = async(userId:string) =>{
    const req = await request()
 const decision = await arcjet.withRule(
    detectBot({
      mode: "LIVE",
      allow: [],
    }),
).withRule(
    fixedWindow({
        mode:"LIVE",
        window: "1m",
        max: 20,
    })
).protect(req, {
    fingerprint: userId
});

return decision
}