// import RateLimit from "express-rate-limit";
// import RedisStore from "rate-limit-redis";
// import redis from "redis";
// import { REDIS_PASSWORD } from "../util/secrets";
// import { REDIS_PORT } from "../util/secrets";
// import { REDIS_HOSTNAME } from "../util/secrets";

// export const limiter = RateLimit({
//     store: new RedisStore({
//         client: redis.createClient({
//             host: REDIS_HOSTNAME,
//             port: parseInt(REDIS_PORT, 10),
//             password: REDIS_PASSWORD
//         })
//     }),
//     windowMs: 60 * 60 * 1000,
//     max: 100,
//     headers: true,
//     message: "You have reached the max limit of requests in 1 hour!"
// });