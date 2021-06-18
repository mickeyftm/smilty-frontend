import { MenuEntry } from '@xdcx/uikit-v1'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    initialOpenState: true,
    // status: {
    //   text: 'MIGRATE',
    //   color: 'warning',
    // },
    items: [
      {
        label: 'Exchange',
        href: 'https://swap.spiritswap.finance/#/swap?outputCurrency=0x5Cc61A78F164885776AA610fb0FE1257df78E59B',
      },
      {
        label: 'Liquidity',
        href: 'https://swap.spiritswap.finance/#/pool',
      },
    ],
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: 'Pools',
    icon: 'PoolIcon',
    href: '/pools',
  },
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Docs',
        href: 'https://smileyswap-lab.gitbook.io/smiley-swap/',
      },
      {
        label: 'Bridge',
        href: 'https://multichain.xyz/',
      },
    ],
  },
]

export default config
