const SIZES = {
  sm: 'h-12 w-12',
  md: 'h-16 w-16 sm:h-20 sm:w-20',
  lg: 'h-14 w-14 sm:h-20 sm:w-20 lg:h-24 lg:w-24',
}

/**
 * The premiere play mark: a hairline gold ring around a fine triangle. On
 * hover of the nearest `group`, gold fills the ring from the centre and the
 * triangle turns black. No glow, no pulse: it should read as a screening
 * invitation, not a music video.
 */
export default function PlayMark({ size = 'md', className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`relative grid shrink-0 place-items-center overflow-hidden rounded-full border border-gold/85 bg-black/30 text-bone backdrop-blur-[2px] transition-[transform,border-color] duration-700 ease-[var(--ease-cine)] group-hover:scale-[1.04] group-hover:border-gold group-focus-visible:border-gold ${SIZES[size]} ${className}`}
    >
      <span className="absolute inset-0 scale-0 rounded-full bg-gold transition-transform duration-700 ease-[var(--ease-cine)] group-hover:scale-100 group-focus-visible:scale-100" />
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="relative ml-[8%] h-[30%] w-[30%] transition-colors duration-500 group-hover:text-black group-focus-visible:text-black"
      >
        <path d="M6.5 3.8v16.4a.5.5 0 0 0 .76.43l13.1-8.2a.5.5 0 0 0 0-.86L7.26 3.37a.5.5 0 0 0-.76.43z" />
      </svg>
    </span>
  )
}
