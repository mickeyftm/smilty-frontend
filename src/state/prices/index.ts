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
  // const tokenList = {
  //   "0x4E77c69B0C4964829405144087c5eCf70d643deA": {
  //     name: "Token",
  //     price: "1",
  //     price_BNB: "0.01",
  //     symbol: "TOKEN"
  //   },
  //   "0x2F104cb88aF971A3a2896cA51d3948748d4fF93A": {
  //     name: "Token1",
  //     price: "2",
  //     price_BNB: "0.01",
  //     symbol: "TOKEN1"
  //   },
  //   "0x1dfd1E98d6f6606c28D630EFf8E4Ad9b130089f8": {
  //     name: "Token2",
  //     price: "3",
  //     price_BNB: "0.01",
  //     symbol: "TOKEN2"
  //   }
  // }

  // data.data = Object.assign(data.data, tokenList)
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
