import styled, { css, keyframes } from 'styled-components'

// TODO: 弄清楚theme.transition是在哪里引入的
export const loadingOpacityMixin = css<{ $loading: boolean }>`
  filter: ${({ $loading }) => ($loading ? 'grayscale(1)' : 'none')};
  opacity: ${({ $loading }) => ($loading ? '0.6' : '1')};
  transition: ${({ $loading, theme }) =>
    $loading ? 'none' : `opacity ${theme.transition.duration.medium} ${theme.transition.timing.inOut}`};
`
