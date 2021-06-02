import React, { useCallback, useState } from 'react'
import { useLocation } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useFarms, useGetApiPrices, usePriceCakeBusd } from 'state/hooks'
import { Card, CardBody, Heading, Skeleton, Text } from '@xdcx/smiley-uikit'
import { useTranslation } from 'contexts/Localization'
import { useGetStats } from 'hooks/api'
import isArchivedPid from 'utils/farmHelpers'
import { getAddress } from 'utils/addressHelpers'
import { getFarmApr } from 'utils/apr'
import { latinise } from 'utils/latinise'

const StyledTotalValueLockedCard = styled(Card)`
  align-items: center;
  display: flex;
  flex: 1;
`
const NUMBER_OF_FARMS_VISIBLE = 12

const TotalValueLockedCard = (props) => {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const [query, setQuery] = useState('')
  let [liquidityList] = useState(0)
  const { data: farmsLP, userDataLoaded } = useFarms()
  const isArchived = pathname.includes('archived')
  const isInactive = pathname.includes('history')
  const isActive = !isInactive && !isArchived
  const prices = useGetApiPrices()
  const cakePrice = usePriceCakeBusd()
  const [numberOfFarmsVisible, setNumberOfFarmsVisible] = useState(NUMBER_OF_FARMS_VISIBLE)

  const [stakedOnly, setStakedOnly] = useState(!isActive)
  const activeFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X' && !isArchivedPid(farm.pid))
    
  const farmsList = useCallback(
    (farmsToDisplay) => {
      let farmsToDisplayWithAPR = farmsToDisplay.map((farm) => {
        if (!farm.lpTotalInQuoteToken || !prices) {
          return farm
        }

        const quoteTokenPriceUsd = prices[getAddress(farm.quoteToken.address).toLowerCase()]
        const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(quoteTokenPriceUsd)
        const apr = isActive ? getFarmApr(farm.poolWeight, cakePrice, totalLiquidity) : 0

        return { ...farm, apr, liquidity: totalLiquidity }
      })

      if (query) {
        const lowercaseQuery = latinise(query.toLowerCase())
        farmsToDisplayWithAPR = farmsToDisplayWithAPR.filter((farm) => {
          return latinise(farm.lpSymbol.toLowerCase()).includes(lowercaseQuery)
        })
      }
      return farmsToDisplayWithAPR
    },
    [cakePrice, prices, query, isActive],
  )

  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  if (isActive) {
    const farms = stakedOnly ? farmsList(stakedOnlyFarms) : farmsList(activeFarms);
    farms.map((data) => {
      liquidityList += Math.round(data.liquidity);
      return liquidityList;
    })
   
  }


  return (
    <StyledTotalValueLockedCard>
      <CardBody>
        <Heading size="lg" mb="24px">
          {t('Total Value Locked (TVL)')}
        </Heading>
        {liquidityList ? (
          <>
            <Heading size="xl">{`$${liquidityList}`}</Heading>
            <Text color="textSubtle">{t('Across all LPs and Syrup Pools')}</Text>
          </>
        ) : (
          <Skeleton height={66} />
        )}
      </CardBody>
    </StyledTotalValueLockedCard>
  )
}

export default TotalValueLockedCard
