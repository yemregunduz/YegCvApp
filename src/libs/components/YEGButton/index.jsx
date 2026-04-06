import { forwardRef } from 'react'
import StyledButton from './styles'

const YEGButton = forwardRef(function YEGButton(
  { $variant, $size, $intent, children, ...props },
  ref,
) {
  return (
    <StyledButton ref={ref} $variant={$variant} $size={$size} $intent={$intent} {...props}>
      {children}
    </StyledButton>
  )
})

export default YEGButton
