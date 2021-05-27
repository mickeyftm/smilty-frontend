import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'PancakeSwap',
  description:
    'The most popular AMM on BSC by user count! Earn SMS through yield farming or win it in the Lottery, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by PancakeSwap), NFTs, and more, on a platform you can trust.',
  image: 'https://pancakeswap.finance/images/hero.png',
}

export const customMeta: { [key: string]: PageMeta } = {
  '/': {
    title: 'Home | SmileySwap',
  },
  '/competition': {
    title: 'Trading Battle | SmileySwap',
  },
  '/prediction': {
    title: 'Prediction | SmileySwap',
  },
  '/farms': {
    title: 'Farms | SmileySwap',
  },
  '/pools': {
    title: 'Pools | SmileySwap',
  },
  '/lottery': {
    title: 'Lottery | SmileySwap',
  },
  '/collectibles': {
    title: 'Collectibles | SmileySwap',
  },
  '/ifo': {
    title: 'Initial Farm Offering | SmileySwap',
  },
  '/teams': {
    title: 'Leaderboard | SmileySwap',
  },
  '/profile/tasks': {
    title: 'Task Center | SmileySwap',
  },
  '/profile': {
    title: 'Your Profile | SmileySwap',
  },
}
