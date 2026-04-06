import { YEGBadge } from '@/libs'
import * as S from '@/components/StatusBadge/styles'

function StatusBadge({ label, value, pulse }) {
  return (
    <YEGBadge $variant="default" $pulse={pulse}>
      <span>
        {label}: <S.ValueText>{value}</S.ValueText>
      </span>
    </YEGBadge>
  )
}

export default StatusBadge
