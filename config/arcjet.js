import arcjet, {shield, detectBot, tokenBucket} from "@arcjet/node";
import { ARCJET_KEY } from "../config/env.js";

const aj = arcjet({
  key: ARCJET_KEY,
  characteristics: ["ip.src"], 
  rules: [

    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE", // or "TEST" for testing
      allow: [ "CATEGORY:SEARCH_ENGINE", "POSTMAN"],
    }),
       tokenBucket({
      mode: "LIVE",
      refillRate: 1,     // 5 tokens per interval
      interval: 10,      // 10-second interval
      capacity: 2,      // Maximum 10 tokens
      cost: 1,           // Each request costs 1 token
    }),
  ],
});

export default aj