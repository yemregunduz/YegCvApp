import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import YEGModal from './index'

const ModalContext = createContext(null)

export function ModalProvider({ children }) {
  const [config, setConfig] = useState(null)
  const [open, setOpen] = useState(false)

  const show = useCallback((options) => {
    setConfig(options)
    setOpen(true)
  }, [])

  const close = useCallback(() => {
    setOpen(false)
  }, [])

  const handleExited = useCallback(() => {
    setConfig(null)
  }, [])

  const value = useMemo(() => ({ show, close }), [show, close])

  return (
    <ModalContext.Provider value={value}>
      {children}
      {config && (
        <YEGModal
          $open={open}
          $size={config.size || 'lg'}
          $scroll={config.scroll || 'outer'}
          title={config.title}
          onClose={close}
          onExited={handleExited}
          noPadding={config.noPadding}
          noHeaderBorder={config.noHeaderBorder}
          footer={config.footer}
        >
          {config.content}
        </YEGModal>
      )}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const ctx = useContext(ModalContext)
  if (!ctx) throw new Error('useModal must be used within ModalProvider')
  return ctx
}
