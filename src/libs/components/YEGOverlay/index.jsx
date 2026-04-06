import { forwardRef } from 'react'
import StyledOverlay from './styles'

const YEGOverlay = forwardRef(function YEGOverlay(
  { $variant, $fadeOut, children, ...props },
  ref,
) {
  return (
    <StyledOverlay ref={ref} $variant={$variant} $fadeOut={$fadeOut} {...props}>
      {children}
    </StyledOverlay>
  )
})

export default YEGOverlay
