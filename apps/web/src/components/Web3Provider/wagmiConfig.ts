import { createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { injected } from '@wagmi/connectors'

declare module 'wagmi' {
    interface Register {
      config: typeof wagmiConfig
    }
  }

export const wagmiConfig = createConfig({
    chains:[mainnet,sepolia],
    connectors: [injected()],
    transports: { // 指定传输方式
        [mainnet.id]: http(),
        [sepolia.id]: http(),
      },
})
