import { forwardRef } from 'react'
import StyledCard from './styles'

const YEGCard = forwardRef(function YEGCard(
  { $variant, $size, $accent, children, ...props },
  ref,
) {
  return (
    <StyledCard ref={ref} $variant={$variant} $size={$size} $accent={$accent} {...props}>
      {children}
    </StyledCard>
  )
})

export default YEGCard
