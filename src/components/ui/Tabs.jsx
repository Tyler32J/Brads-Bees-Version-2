import { useLayoutEffect, useRef } from 'react'
import './Tabs.css'

// A row of choices in a white rounded bar with a honey pill that slides behind
// the selected one. Used as real tabs on the Services page, and as filter
// buttons on the Gallery (filters: true), where each choice can show a count.
export default function Tabs({ tabs, activeId, onChange, label, filters = false, className = '' }) {
  const indicatorRef = useRef(null)
  const buttonRefs = useRef({})

  useLayoutEffect(() => {
    function moveIndicator() {
      const button = buttonRefs.current[activeId]
      const indicator = indicatorRef.current
      if (!button || !indicator) return
      indicator.style.left = `${button.offsetLeft}px`
      indicator.style.top = `${button.offsetTop}px`
      indicator.style.width = `${button.offsetWidth}px`
      indicator.style.height = `${button.offsetHeight}px`
    }

    moveIndicator()
    window.addEventListener('resize', moveIndicator)
    return () => window.removeEventListener('resize', moveIndicator)
  }, [activeId, tabs])

  return (
    <div
      className={`tabs${className ? ` ${className}` : ''}`}
      role={filters ? 'group' : 'tablist'}
      aria-label={label}
    >
      <span className="tabs-indicator" ref={indicatorRef} aria-hidden="true" />
      {tabs.map((tab) => {
        const isActive = tab.id === activeId
        const roleProps = filters
          ? { 'aria-pressed': isActive }
          : {
              role: 'tab',
              id: `tab-${tab.id}`,
              'aria-selected': isActive,
              'aria-controls': `panel-${tab.id}`,
            }
        return (
          <button
            key={tab.id}
            type="button"
            {...roleProps}
            className={`tab${isActive ? ' active' : ''}`}
            ref={(el) => {
              buttonRefs.current[tab.id] = el
            }}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
            {tab.count != null && <span className="tab-count">{tab.count}</span>}
          </button>
        )
      })}
    </div>
  )
}
