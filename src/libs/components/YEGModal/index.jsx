import { forwardRef, useEffect, useCallback, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { FiX } from 'react-icons/fi'
import YEGButton from '@/libs/components/YEGButton'
import * as S from './styles'

// ── Scroll Lock ──

function useScrollLock(active) {
  useEffect(() => {
    if (!active) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [active])
}

// ── Focus Trap (basic) ──

function useFocusTrap(ref, active) {
  useEffect(() => {
    if (!active || !ref.current) return

    const el = ref.current
    const focusable = el.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )
    if (focusable.length) focusable[0].focus()

    const handleTab = (e) => {
      if (e.key !== 'Tab' || !focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    el.addEventListener('keydown', handleTab)
    return () => el.removeEventListener('keydown', handleTab)
  }, [ref, active])
}

// ── Main Component ──

const YEGModal = forwardRef(function YEGModal(
  {
    $open = false,
    $size = 'lg',
    $scroll = 'outer',
    title,
    closeOnEsc = true,
    closeOnOverlay = true,
    showClose = true,
    noPadding = false,
    noHeaderBorder = false,
    footer,
    onClose,
    onOpen,
    onExited,
    children,
    ...props
  },
  ref,
) {
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)
  const windowRef = useRef(null)

  useEffect(() => {
    if ($open) {
      setVisible(true)
      setClosing(false)
      onOpen?.()
    } else if (visible) {
      handleClose()
    }
  }, [$open])

  useScrollLock(visible && !closing)
  useFocusTrap(windowRef, visible && !closing)

  const handleClose = useCallback(() => {
    setClosing(true)
    setTimeout(() => {
      setVisible(false)
      setClosing(false)
      onExited?.()
    }, 200)
  }, [onExited])

  useEffect(() => {
    if (!visible || !closeOnEsc) return
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [visible, closeOnEsc, onClose])

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && closeOnOverlay) {
      onClose?.()
    }
  }

  if (!visible) return null

  const hasHeader = title || showClose

  const modal = (
    <S.Overlay $closing={closing} $scroll={$scroll} onClick={handleOverlayClick}>
      <S.Window
        ref={(node) => {
          windowRef.current = node
          if (typeof ref === 'function') ref(node)
          else if (ref) ref.current = node
        }}
        $size={$size}
        $scroll={$scroll}
        $closing={closing}
        role="dialog"
        aria-modal="true"
        aria-label={title || 'Modal'}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {hasHeader && (
          <S.Header $borderless={noHeaderBorder}>
            <S.Title>{title}</S.Title>
            {showClose && (
              <YEGButton $variant="icon" $intent="danger" $size="sm" onClick={onClose} title="Close">
                <FiX />
              </YEGButton>
            )}
          </S.Header>
        )}

        <S.Body $noPadding={noPadding} $scroll={$scroll}>
          {children}
        </S.Body>

        {footer && <S.Footer>{footer}</S.Footer>}
      </S.Window>
    </S.Overlay>
  )

  return createPortal(modal, document.body)
})

export default YEGModal
