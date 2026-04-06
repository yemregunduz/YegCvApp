import { forwardRef } from 'react'
import StyledMenu, { StyledItem } from './styles'

const YEGDropdown = forwardRef(function YEGDropdown(
  { $align, $direction, children, ...props },
  ref,
) {
  return (
    <StyledMenu ref={ref} $align={$align} $direction={$direction} {...props}>
      {children}
    </StyledMenu>
  )
})

function YEGDropdownItem({ $active, children, ...props }) {
  return (
    <StyledItem $active={$active} {...props}>
      {children}
    </StyledItem>
  )
}

export { YEGDropdownItem as Item }
export default YEGDropdown
