import styled from 'styled-components'

export const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const DotButton = styled.button`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  border: none;
  padding: 0;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(0, 0, 0, 0.6);

  svg {
    width: 8px;
    height: 8px;
    stroke-width: 3;
  }

  &:hover {
    transform: scale(1.2);
    box-shadow: 0 0 8px ${({ $color }) => $color}80;
    color: rgba(0, 0, 0, 0.9);
  }

  &:active {
    transform: scale(0.9);
  }
`
