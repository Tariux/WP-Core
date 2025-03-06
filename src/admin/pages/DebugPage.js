import React, { useEffect, useRef, useState } from "react"
import "./styles.scss"

// AnimatedSpan component
const AnimatedSpan = ({ children, delay = 0, className }) => (
  <div className={`animated-span ${className || ""}`} style={{ animationDelay: `${delay}ms` }}>
    {children}
  </div>
)

// TypingAnimation component
const TypingAnimation = ({ children, className, duration = 60, delay = 0, as: Component = "span" }) => {
  if (typeof children !== "string") {
    throw new Error("TypingAnimation: children must be a string")
  }

  const [displayedText, setDisplayedText] = useState("")
  const [started, setStarted] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true)
    }, delay)
    return () => clearTimeout(startTimeout)
  }, [delay])

  useEffect(() => {
    if (!started) return

    let i = 0
    const typingEffect = setInterval(() => {
      if (i < children.length) {
        setDisplayedText(children.substring(0, i + 1))
        i++
      } else {
        clearInterval(typingEffect)
      }
    }, duration)

    return () => {
      clearInterval(typingEffect)
    }
  }, [children, duration, started])

  return (
    <Component ref={elementRef} className={`typing-animation ${className || ""}`}>
      {displayedText}
    </Component>
  )
}

// Terminal component
const Terminal = ({ children, className }) => {
  return (
    <div className={`terminal ${className || ""}`}>
      <div className="terminal-header">
        <div className="terminal-buttons">
          <div className="terminal-button red"></div>
          <div className="terminal-button yellow"></div>
          <div className="terminal-button green"></div>
        </div>
      </div>
      <pre className="terminal-content">
        <code className="terminal-code">{children}</code>
      </pre>
    </div>
  )
}

// Main TerminalDemo component
const TerminalDemo = () => {
  return (
    <Terminal>
      <TypingAnimation>&gt; pnpm dlx shadcn@latest init</TypingAnimation>

      <AnimatedSpan delay={1500} className="success">
        <span>✔ Preflight checks.</span>
      </AnimatedSpan>

      <AnimatedSpan delay={2000} className="success">
        <span>✔ Verifying framework. Found Next.js.</span>
      </AnimatedSpan>

      <AnimatedSpan delay={2500} className="success">
        <span>✔ Validating Tailwind CSS.</span>
      </AnimatedSpan>

      <AnimatedSpan delay={3000} className="success">
        <span>✔ Validating import alias.</span>
      </AnimatedSpan>

      <AnimatedSpan delay={3500} className="success">
        <span>✔ Writing components.json.</span>
      </AnimatedSpan>

      <AnimatedSpan delay={4500} className="success">
        <span>✔ Updating tailwind.config.ts</span>
      </AnimatedSpan>

      <AnimatedSpan delay={5000} className="success">
        <span>✔ Updating app/globals.css</span>
      </AnimatedSpan>

      <AnimatedSpan delay={5500} className="success">
        <span>✔ Installing dependencies.</span>
      </AnimatedSpan>

      <TypingAnimation delay={6500} className="muted">
        Success! Project initialization completed.
      </TypingAnimation>

      <TypingAnimation delay={7000} className="muted">
        You may now add components.
      </TypingAnimation>
    </Terminal>
  )
}

const DebugPage = () => {
  return (
    <div className="debug-page">
      <TerminalDemo />
    </div>
  )
}

export default DebugPage

