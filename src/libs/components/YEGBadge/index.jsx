import { forwardRef } from 'react'
import StyledBadge, { PulseDot } from './styles'

const YEGBadge = forwardRef(function YEGBadge(
  { $variant, $size, $pulse, $pulseColor, children, ...props },
  ref,
) {
  return (
    <StyledBadge ref={ref} $variant={$variant} $size={$size} {...props}>
      {$pulse && <PulseDot $color={$pulseColor} />}
      {children}
    </StyledBadge>
  )
})

export { PulseDot }
export default YEGBadge
