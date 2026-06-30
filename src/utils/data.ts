import { createPublicClient, http, parseAbi } from 'viem';

export const ERC721_ABI = parseAbi([
  'function tokenURI(uint256 tokenId) external view returns (string memory)',
]);
export const PUBLIC_CLIENT = createPublicClient({
  transport: http('https://vercel-rpc-view.vercel.app/api/view'),
});
