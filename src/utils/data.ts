import { createPublicClient, fallback, http, parseAbi } from 'viem';
import { mainnet } from 'viem/chains';

export const ERC721_ABI = parseAbi([
  'function tokenURI(uint256 tokenId) external view returns (string memory)',
]);

const RPC_ENDPOINTS = [
  'https://vercel-rpc-view.vercel.app/api/view',
  'https://eth.llamarpc.com',
  'https://eth-mainnet.public.blastapi.io',
  'https://rpc.ankr.com/eth',
  'https://rpc.flashbots.net/',
  'https://cloudflare-eth.com/',
  'https://eth-mainnet.gateway.pokt.network/v1/5f3453978e354ab992c4da79',
  'https://ethereum.publicnode.com',
  'https://nodes.mewapi.io/rpc/eth',
  'https://eth-mainnet.nodereal.io/v1/1659dfb40aa24bbb8153a677b98064d7',
];

export const PUBLIC_CLIENT = createPublicClient({
  chain: mainnet,
  transport: fallback(
    RPC_ENDPOINTS.map((url) => http(url)),
    {
      retryCount: 3,
      retryDelay: 100,
    },
  ),
});
