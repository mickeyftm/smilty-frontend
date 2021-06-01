import { MenuEntry } from '@xdcx/uikit-v1'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: 'http://smileyswap.com/',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    initialOpenState: true,
    status: {
      text: 'MIGRATE',
      color: 'warning',
    },
    items: [
      {
        label: 'Exchange',
        href: 'http://smileyswap.com/swap/',
      },
      {
        label: 'Liquidity',
        href: 'http://smileyswap.com/swap/#/pool',
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
        label: 'Contact',
        href: 'https://smileyswap-lab.gitbook.io/smiley-swap/',
      },
      {
        label: 'Github',
        href: 'https://github.com/smileyswap',
      },
      {
        label: 'Docs',
        href: 'https://smileyswap-lab.gitbook.io/smiley-swap/',
      },
      {
        label: 'Bridge',
        href: 'https://smileyswap-lab.gitbook.io/smiley-swap/getting-started/contract-addresses',
      },
    ],
  },
]

export default config
