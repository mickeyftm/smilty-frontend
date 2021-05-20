/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PriceApiResponse, PriceApiThunk, PriceState } from 'state/types'

const initialState: PriceState = {
  isLoading: false,
  lastUpdated: null,
  data: null,
}

// Thunks
export const fetchPrices = createAsyncThunk<PriceApiThunk>('prices/fetch', async () => {
  const response = await fetch('https://api.pancakeswap.info/api/v2/tokens')
  const data = (await response.json()) as PriceApiResponse

  // console.log(data)
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
