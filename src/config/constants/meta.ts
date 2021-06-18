import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'PancakeSwap',
  description:
    'The most popular AMM on BSC by user count! Earn AMB through yield farming or win it in the Lottery, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by PancakeSwap), NFTs, and more, on a platform you can trust.',
  image: '',
}

export const customMeta: { [key: string]: PageMeta } = {
  '/': {
    title: 'Home | AmabieSwap',
  },
  '/competition': {
    title: 'Trading Battle | AmabieSwap',
  },
  '/prediction': {
    title: 'Prediction | AmabieSwap',
  },
  '/farms': {
    title: 'Farms | AmabieSwap',
  },
  '/pools': {
    title: 'Pools | AmabieSwap',
  },
  '/lottery': {
    title: 'Lottery | AmabieSwap',
  },
  '/collectibles': {
    title: 'Collectibles | AmabieSwap',
  },
  '/ifo': {
    title: 'Initial Farm Offering | AmabieSwap',
  },
  '/teams': {
    title: 'Leaderboard | AmabieSwap',
  },
  '/profile/tasks': {
    title: 'Task Center | AmabieSwap',
  },
  '/profile': {
    title: 'Your Profile | AmabieSwap',
  },
}
