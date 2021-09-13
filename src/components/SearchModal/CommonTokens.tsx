import React from 'react'
import { Text } from 'rebass'
import { ChainId, Currency, currencyEquals, Token } from '@swapr/sdk'

import { SUGGESTED_BASES } from '../../constants'
import { AutoColumn } from '../Column'
import { AutoRow } from '../Row'
import CurrencyLogo from '../CurrencyLogo'
import { TYPE } from '../../theme'
import { useNativeCurrency } from '../../hooks/useNativeCurrency'
import styled from 'styled-components'

const BaseWrapper = styled.div<{ disable?: boolean }>`
  border: 1px solid ${({ theme, disable }) => (disable ? 'transparent' : theme.bg3)};
  border-radius: 12px;
  display: flex;
  line-height:19.5px;
  padding: 6px 10px;
  margin-right:8px;
  color: ${({ theme }) => theme.text1};
  align-items: center;
  :hover {
    cursor: ${({ disable }) => !disable && 'pointer'};
    background-color: ${({ theme, disable }) => !disable && theme.bg2};
  }

  color: ${({ theme, disable }) => disable && theme.text3};
  background-color: ${({ theme, disable }) => disable ? theme.bg2:theme.bg3};
  filter: ${({ disable }) => disable && 'grayscale(1)'};
`

export default function CommonTokens({
  chainId,
  onSelect,
  selectedCurrency
}: {
  chainId?: ChainId
  selectedCurrency?: Currency | null
  onSelect: (currency: Currency) => void
}) {
  const nativeCurrency = useNativeCurrency()
console.log(selectedCurrency)
  console.log(selectedCurrency === nativeCurrency || selectedCurrency===undefined)
  return (
    <AutoColumn gap="15px">
      <AutoRow>
        <TYPE.body fontWeight={500} fontSize="11px" lineHeight="13px" letterSpacing="0.06em">
          COMMON TOKENS
        </TYPE.body>
      </AutoRow>
      <AutoRow gap="4px">
        <BaseWrapper
          onClick={() => {
            if (!selectedCurrency || !currencyEquals(selectedCurrency, nativeCurrency)) {
              onSelect(nativeCurrency)
            }
          }}
          disable={selectedCurrency === nativeCurrency || selectedCurrency===undefined}
        >
          <CurrencyLogo size="20px" currency={nativeCurrency} marginRight={8} />
          <Text fontWeight={500} fontSize={16}>
            {nativeCurrency.symbol}
          </Text>
        </BaseWrapper>
        {(chainId ? SUGGESTED_BASES[chainId] : []).map((token: Token) => {
          const selected = selectedCurrency instanceof Token && selectedCurrency.address === token.address
          return (
            <BaseWrapper
              onClick={() => !selected && onSelect(token)}
              disable={selected}
              key={token.address}
            >
              <CurrencyLogo size="20px" currency={token} marginRight={8} />
              <Text fontWeight={500} fontSize={16}>
                {token.symbol}
              </Text>
            </BaseWrapper>
          )
        })}
      </AutoRow>
    </AutoColumn>
  )
}
