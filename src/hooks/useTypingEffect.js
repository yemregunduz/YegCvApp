import { useState, useEffect } from 'react'

export function useTypingEffect(text, typingSpeed = 100, deletingSpeed = 50, pauseMs = 2000) {
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    let timeout
    if (!isDeleting && displayed === text) {
      timeout = setTimeout(() => setIsDeleting(true), pauseMs)
    } else if (isDeleting && displayed === '') {
      setIsDeleting(false)
    } else {
      timeout = setTimeout(
        () =>
          setDisplayed(
            isDeleting
              ? text.substring(0, displayed.length - 1)
              : text.substring(0, displayed.length + 1),
          ),
        isDeleting ? deletingSpeed : typingSpeed,
      )
    }
    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, text, typingSpeed, deletingSpeed, pauseMs])

  return displayed
}
