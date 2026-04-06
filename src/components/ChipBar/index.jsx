import * as S from '@/components/ChipBar/styles'
import YEGButton from '@/libs/components/YEGButton'

function ChipBar({ items, onItemClick }) {
  return (
    <S.Bar>
      {items.map((item) => (
        <YEGButton key={item} $variant="chip" onClick={() => onItemClick(item)}>
          {item}
        </YEGButton>
      ))}
    </S.Bar>
  )
}

export default ChipBar
