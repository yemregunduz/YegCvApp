import { FiX, FiMinus, FiMaximize2, FiMinimize2 } from 'react-icons/fi'
import * as S from './styles'

const BUTTONS = [
  { key: 'close', color: '#ff5f56', Icon: FiX },
  { key: 'minimize', color: '#ffbd2e', Icon: FiMinus },
  { key: 'fullscreen', color: '#27c93f' },
]

function WindowControls({ onClose, onMinimize, onFullscreen, isFullscreen }) {
  const handlers = { close: onClose, minimize: onMinimize, fullscreen: onFullscreen }

  return (
    <S.Controls>
      {BUTTONS.map(({ key, color, Icon }) => (
        <S.DotButton key={key} $color={color} onClick={handlers[key]}>
          {key === 'fullscreen'
            ? (isFullscreen ? <FiMinimize2 strokeWidth={4} /> : <FiMaximize2 strokeWidth={4} />)
            : Icon && <Icon strokeWidth={4} />}
        </S.DotButton>
      ))}
    </S.Controls>
  )
}

export default WindowControls
