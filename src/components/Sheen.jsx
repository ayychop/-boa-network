import { useState } from 'react'

/**
 * The diagonal sheen on portraits. Spread `triggers` on whatever should start it
 * and render `sheen` inside the clipped frame, above the photo and below any text.
 * Held until the animation ends, so leaving mid-sweep doesn't cut the sheen off.
 */
export function useSheen() {
  const [sweeping, setSweeping] = useState(false)
  const start = () => setSweeping(true)
  return {
    triggers: { onMouseEnter: start, onFocus: start },
    sheen: (
      <div
        aria-hidden="true"
        className={`talent-sheen ${sweeping ? 'is-sweeping' : ''}`}
        onAnimationEnd={() => setSweeping(false)}
      />
    ),
  }
}
