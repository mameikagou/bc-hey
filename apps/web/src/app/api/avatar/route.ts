import { NextResponse } from 'next/server';
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import getRpc from '../helpers/rpc';

// @ts-ignore
import { getRedis } from "@bc-hey/db/redisClient.mts";
export async function GET(req: Request, res: Response) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    console.log("id", id)
    if (!id) {
        return NextResponse.json({ message: "id is need" })
    }
    const client = createPublicClient({
        chain: mainnet,
        transport: getRpc({ mainnet: false }),
    })
    const blockNumber = await client.getBlockNumber()
    const cachedData = await getRedis('key1')
    const response = {
        message: "Hey API ✨",
        id: id,
        bigIntValue: blockNumber.toString(),
        cachedData: cachedData
    };

    return NextResponse.json(response);
}