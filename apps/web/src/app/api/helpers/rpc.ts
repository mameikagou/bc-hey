import type { FallbackTransport } from "viem";
import { http, fallback } from "viem";
export const POLYGON_RPCS = [
    "https://polygon-rpc.com",
    "https://polygon-bor-rpc.publicnode.com",
    "https://polygon.drpc.org"
];

export const POLYGON_AMOY_RPCS = [
    "https://rpc-amoy.polygon.technology",
    "https://polygon-amoy.drpc.org"
];

const getRpc = ({ mainnet }: { mainnet: boolean }): FallbackTransport => {
    if (mainnet) {
        return fallback(POLYGON_RPCS.map((rpc) => http(rpc)));
    }

    return fallback(POLYGON_AMOY_RPCS.map((rpc) => http(rpc)));
};

export default getRpc;
