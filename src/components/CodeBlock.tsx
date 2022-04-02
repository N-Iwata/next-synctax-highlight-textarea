import React, { LegacyRef, useEffect, useRef, useState } from 'react'
import Prism from 'prismjs'

import styles from 'src/components/CodeBlock.module.css'
import { Lang } from 'src/types'

type Props = {
  lang: Lang
}

const CodeBlock: React.FC<Props> = ({ lang }) => {
  const [code, setCode] = useState(`const test = 10`)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const codeRef = useRef<HTMLPreElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value)
    syncScroll()
  }

  const syncScroll = () => {
    if (textareaRef.current && codeRef.current) {
      codeRef.current.scrollTop = textareaRef.current.scrollTop
    }
  }

  const tabInput = (e: any) => {
    if (e.key == 'Tab' && textareaRef.current) {
      e.preventDefault()

      const before = code.slice(0, textareaRef.current.selectionStart)
      const after = code.slice(
        textareaRef.current.selectionEnd,
        textareaRef.current.value.length,
      )
      const cursorPos = textareaRef.current.selectionEnd + 1

      const text = `${before}\t${after}`
      textareaRef.current.value = text
      textareaRef.current.selectionStart = cursorPos
      textareaRef.current.selectionEnd = cursorPos

      setCode(text)
    }
  }

  useEffect(() => {
    Prism.highlightAll()
  }, [code, textareaRef])

  return (
    <div className={styles.container}>
      <textarea
        value={code}
        onChange={handleChange}
        onScroll={syncScroll}
        onKeyDown={tabInput}
        className={styles.textarea}
        spellCheck="false"
        ref={textareaRef}
      />
      <pre className={styles.pre} ref={codeRef}>
        <code className={`language-${lang} ${styles.code}`}>{code}</code>
      </pre>
    </div>
  )
}

export default CodeBlock
