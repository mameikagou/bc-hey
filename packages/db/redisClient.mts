import { createClient, RedisClientType } from 'redis';

const redisClient = createClient({ url: "redis://localhost:6379" })
const connectRedis = async () => {
    await redisClient?.connect();
};
connectRedis().catch((error) =>
    console.error("[Redis] Connection error", error)
);

await redisClient.set('key', 'value');
await redisClient.set('key1', 'value222');
// const value = await client.get('key');
// await client.disconnect();

export const getRedis = async (key: string) => {
    if (!redisClient) {
        console.log("no redis running")
        return null;
    }
    return await redisClient.get(key);
};
