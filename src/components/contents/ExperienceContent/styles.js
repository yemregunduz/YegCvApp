import styled from 'styled-components'

export const Timeline = styled.div`
  position: relative;
  padding-left: 3rem;

  &::before {
    content: '';
    position: absolute;
    left: 12px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: ${({ theme }) => theme.colors.border};
  }
`

export const TimelineItem = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
  &:last-child {
    margin-bottom: 0;
  }
`

export const Marker = styled.div`
  position: absolute;
  left: -3rem;
  top: 0;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.bgPrimary};
  color: ${({ $highlight, theme }) => ($highlight ? theme.colors.cyan : theme.colors.textMuted)};
  font-size: 1rem;
  z-index: 1;
`

export const Period = styled.span`
  font-size: 0.65rem;
  color: ${({ theme }) => theme.colors.cyan};
  letter-spacing: 2px;
  display: block;
  margin-bottom: 0.25rem;
`

export const Role = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 0.25rem;
`

export const Description = styled.p`
  font-size: 0.72rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
`
