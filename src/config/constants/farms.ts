import tokens from './tokens'
import { FarmConfig } from './types'
import contracts from './contracts'

const farms: FarmConfig[] = [
  /**
   * These 3 farms (PID 0, 251, 252) should always be at the top of the file.
   */
    // {
    //   pid: 0,
    //   lpSymbol: 'LP0',
    //   lpAddresses: {
    //     250: '',
    //     4002: '0xe536dD58f1C221395b7C6ecD6643398e7aaD64E1',
    //   },
    //   token: tokens.syrup,
    //   quoteToken: tokens.wftm,
    // },
    {
      pid: 1,
      lpSymbol: 'DAI-USDC LP',
      lpAddresses: {
        250: '0x9606D683d03f012DDa296eF0ae9261207C4A5847',
        4002: '0x9606D683d03f012DDa296eF0ae9261207C4A5847',
      },
      token: tokens.dai,
      quoteToken: tokens.usdt,
    },
    {
      pid: 4,
      lpSymbol: 'BUSD-USDT LP',
      lpAddresses: {
        250: '0x8dDf72bA97DE0FfFa019f24132452244DC3f2A2B',
        4002: '0x8dDf72bA97DE0FfFa019f24132452244DC3f2A2B',
      },
      token: tokens.busd,
      quoteToken: tokens.usdt,
    },
    {
      pid: 0,
      risk: 5,
      lpSymbol: 'TEST-USDC LP',
      decimal: 18,
      lpAddresses: {
        250: '0xB84cEab651ED201726D72fc20F2dE828bfC1c9a9',
      },
      tokenSymbol: 'TEST',
      tokenAddresses: {
        250: '0xD6232b0e8d604d45a9Ebfc4fbf500fC22f1cedD6',
      },
      quoteTokenSymbol: QuoteToken.USDC,
      quoteTokenAdresses: contracts.usdc,
    },
]

export default farms
