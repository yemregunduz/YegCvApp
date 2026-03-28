import { useEffect } from 'react'
import { FiX } from 'react-icons/fi'
import * as S from '@/components/Modal/styles'

function Modal({ open, title, onClose, noPadding, noHeaderBorder, children }) {
  useEffect(() => {
    if (!open) return
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [open, onClose])

  if (!open) return null

  return (
    <S.Overlay onClick={onClose}>
      <S.Window onClick={(e) => e.stopPropagation()}>
        <S.Header>
          <S.Title>{title}</S.Title>
          <S.CloseButton onClick={onClose}>
            <FiX />
          </S.CloseButton>
        </S.Header>
        <S.Body $noPadding={noPadding} $noHeaderBorder={noHeaderBorder}>
          {children}
        </S.Body>
      </S.Window>
    </S.Overlay>
  )
}

export default Modal
