/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PriceApiResponse, PriceApiThunk, PriceState } from 'state/types'
// import { ChainId, Token, WETH, Fetcher, TokenAmount, Route  } from '@xdcx/smiley-sdk'
import { ChainId, Token, WETH, Pair, Fetcher, TokenAmount, Route } from '@xdcx/smiley-sdk'
import { getWeb3NoAccount } from 'utils/web3'
import { providers, getDefaultProvider } from "ethers";
import { BaseProvider, Web3Provider } from '@ethersproject/providers'
import getRpcUrl from 'utils/getRpcUrl'

const RPC_URL = getRpcUrl()

const initialState: PriceState = {
  isLoading: false,
  lastUpdated: null,
  data: null,
}

// Thunks
export const fetchPrices = createAsyncThunk<PriceApiThunk>('prices/fetch', async () => {
  const response = await fetch('https://api.pancakeswap.info/api/v2/tokens')
  const data = (await response.json()) as PriceApiResponse
  const web3 = getWeb3NoAccount()

  // console.log(data, 'data')
  // console.log(ChainId, 'ChainId')
  const DAI = new Token(ChainId.BSCTESTNET, '0x3a714C664D79227f70Bb696Baa5B56EB4DF8C7A7', 18)

  async function getPair(): Promise<Pair> {
    console.log(DAI)
    console.log(WETH[DAI.chainId])
    const pairAddress = Pair.getAddress(DAI, WETH[DAI.chainId])
    console.log(pairAddress, 'pairAddress')
    const reserves = ['0x1fD803aF0401bc5BC2279243c72F6E712e5A73Ba', '0x8dDf72bA97DE0FfFa019f24132452244DC3f2A2B']
    console.log(reserves, 'reserves')
    const [reserve0, reserve1] = reserves
    console.log(reserve0, 'reserve0')
    console.log(reserve1, 'reserve1')
    const tokens = [DAI, WETH[DAI.chainId]]
    const [token0, token1] = tokens[0].sortsBefore(tokens[1]) ? tokens : [tokens[1], tokens[0]]
  
    const pair = new Pair(new TokenAmount(token0, reserve0), new TokenAmount(token1, reserve1))
    return pair
  }

  const pair = await getPair();
  console.log(pair)
    const route = new Route([pair], WETH[DAI.chainId])

  console.log(route.midPrice.toSignificant(6), 'new token')
  // console.log(data)
  // console.log(DAI, 'DAI')
  // console.log(WETH[DAI.chainId])
  // console.log(WETH, 'WETH')

  // console.log(web3, 'web3-a')
  // console.log(providers, 'providers-a')
  // const initProvider = await new providers.Web3Provider((window as WindowChain).ethereum as any)
  // console.log(initProvider);

  // const defaultProvider = getDefaultProvider('mainnet', {
  //   infura: 'https://mainnet.infura.io/v3/ba14d1b3cfe5405088ee3c65ebd1d4' 
  // });
  // const ethereum = (window as WindowChain).ethereum
  // (ethereum)
  // let provider = new ethereum.providers.Web3Provider(web3.currentProvider);
  // const smsProvider = new providers.JsonRpcProvider(RPC_URL)
  // console.log(smsProvider)
  // try {
  //   // const pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId], new Web3Provider(web3.currentProvider as any))
  //   const pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId], smsProvider as any)
  //   console.log(pair, 'pair')
  // } catch (error) {
  //   console.log(error)
  // }
 


  const tokenList = {
    "0x3F50080A84DfDE885Ca3348d9180D91A402EbB88": {
      name: "USDT",
      price: "1",
      price_BNB: "0.01",
      symbol: "USDT"
    },
    "0x17D321515D0D91Ca7eA4DD37e62C9707d23Bbc66": {
      name: "USDC",
      price: "2",
      price_BNB: "0.01",
      symbol: "USDC"
    },
    "0x1dfd1E98d6f6606c28D630EFf8E4Ad9b130089f8": {
      name: "Token2",
      price: "3",
      price_BNB: "0.01",
      symbol: "TOKEN2"
    },
    "0x7cdfb60FD99F018F3E7008717ac914E06f332c1f": {
      name: "UNI",
      price: "3",
      price_BNB: "0.01",
      symbol: "UNI"
    },
    "0x3eB3F51081206AD9d1ffA6571dd8770d83d79B6f": {
      name: "BUSD",
      price: "3",
      price_BNB: "0.01",
      symbol: "BUSD"
    },
    "0x3a714C664D79227f70Bb696Baa5B56EB4DF8C7A7": {
      name: "DAI",
      price: "3",
      price_BNB: "0.01",
      symbol: "DAI"
    }
  }

  console.log(tokenList, 'tokenList')

  data.data = Object.assign(data.data, tokenList)
  // Return normalized token names
  return {
    updated_at: data.updated_at,
    data: Object.keys(data.data).reduce((accum, token) => {
      return {
        ...accum,
        [token.toLowerCase()]: parseFloat(data.data[token].price),
      }
    }, {}),
  }
})

export const pricesSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPrices.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchPrices.fulfilled, (state, action: PayloadAction<PriceApiThunk>) => {
      state.isLoading = false
      state.lastUpdated = action.payload.updated_at
      state.data = action.payload.data
    })
  },
})

export default pricesSlice.reducer
