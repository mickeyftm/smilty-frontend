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
      pid: 0,
      lpSymbol: 'DAI-USDT LP',
      lpAddresses: {
        250: '0xDC1240a044ccB5953ecD831fbd626f2fb1EC6A77',
        4002: '0x1fD803aF0401bc5BC2279243c72F6E712e5A73Ba',
      },
      token: tokens.dai,
      quoteToken: tokens.usdt,
    },
    {
      pid: 1,
      lpSymbol: 'BUSD-USDT LP',
      lpAddresses: {
        250: '0x31Ea4050d84F4F3b5776A7678E408DfB4132A7D8',
        4002: '0x8dDf72bA97DE0FfFa019f24132452244DC3f2A2B',
      },
      token: tokens.busd,
      quoteToken: tokens.usdt,
    },
]

export default farms
