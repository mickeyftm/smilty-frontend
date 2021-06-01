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
  data: null
}

const SMS = new Token(ChainId.BSCTESTNET, '0xe536dD58f1C221395b7C6ecD6643398e7aaD64E1', 18)

async function getPair(): Promise<Pair> {

  const pairAddress = Pair.getAddress(SMS, WETH[SMS.chainId])

  const reserves = ['0x1fD803aF0401bc5BC2279243c72F6E712e5A73Ba', '0x8dDf72bA97DE0FfFa019f24132452244DC3f2A2B']

  const [reserve0, reserve1] = reserves

  const tokens = [SMS, WETH[SMS.chainId]]
  const [token0, token1] = tokens[0].sortsBefore(tokens[1]) ? tokens : [tokens[1], tokens[0]]

  const pair = new Pair(new TokenAmount(token0, reserve0), new TokenAmount(token1, reserve1))
  return pair
}


// Thunks
export const fetchPrices = createAsyncThunk<PriceApiThunk>('prices/fetch', async () => {
  const response = await fetch('https://api.pancakeswap.info/api/v2/tokens')
  const data = (await response.json()) as PriceApiResponse

  
    const pair = await getPair();

    const route = new Route([pair], WETH[SMS.chainId])
    const smsMidPrice = route.midPrice.toSignificant(6);

    const tokenList = {
        "0xe536dD58f1C221395b7C6ecD6643398e7aaD64E1": {
          name: "SMS",
          price: smsMidPrice.toString(),
          price_BNB: smsMidPrice.toString(),
          symbol: "SMS"
        }
    }

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
