import { useState, useCallback } from 'react'
import YEGButton from '@/libs/components/YEGButton'

function CopyButton({ text, copyLabel = 'Copy', copiedLabel = 'Copied!', onCopy, ...props }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      if (onCopy) onCopy()
      setTimeout(() => setCopied(false), 2000)
    })
  }, [text, onCopy])

  return (
    <YEGButton 
      $variant="chip"
      {...props}
      onClick={handleCopy}
    >
      {copied ? copiedLabel : copyLabel}
    </YEGButton>
  )
}

export default CopyButton