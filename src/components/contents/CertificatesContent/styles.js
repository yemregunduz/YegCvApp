import styled, { keyframes } from 'styled-components'

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

export const Card = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 1.5rem;
  overflow: hidden;
  transition: all 0.3s;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${({ $color }) => $color};
  }

  &:hover {
    border-color: ${({ $color }) => $color};
    transform: translateY(-2px);
    box-shadow: 0 8px 24px ${({ theme }) => theme.colors.shadow};
  }
`

export const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
`

export const IconRing = styled.div`
  width: 44px;
  height: 44px;
  min-width: 44px;
  border-radius: 50%;
  border: 2px solid ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  color: ${({ $color }) => $color};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    border: 1px dashed ${({ $color }) => $color}33;
  }
`

export const Title = styled.h3`
  font-size: 0.85rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 1.4;
`

export const Instructor = styled.span`
  display: block;
  font-size: 0.62rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: 2px;
`

export const Meta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`

export const Issuer = styled.span`
  font-size: 0.68rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`

export const DateBadge = styled.span`
  font-size: 0.55rem;
  color: ${({ $color }) => $color};
  font-weight: 700;
  letter-spacing: 2px;
  padding: 3px 10px;
  border: 1px solid ${({ $color }) => $color}44;
  border-radius: 20px;
  background: ${({ $color }) => $color}11;
`

export const Ribbon = styled.div`
  position: absolute;
  top: 12px;
  right: -28px;
  background: ${({ $color }) => $color};
  color: ${({ theme }) => (theme.mode === 'dark' ? '#0a0a0f' : '#ffffff')};
  font-size: 0.45rem;
  font-weight: 800;
  letter-spacing: 2px;
  padding: 3px 32px;
  transform: rotate(45deg);
  background-size: 200% auto;
  background-image: linear-gradient(
    90deg,
    ${({ $color }) => $color} 0%,
    ${({ $color }) => $color}cc 50%,
    ${({ $color }) => $color} 100%
  );
  animation: ${shimmer} 3s linear infinite;
`
