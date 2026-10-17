import VideoFacade from './VideoFacade'
import { HudCorners } from './ui'

// The reel in its cinematic frame: poster first, the player on request.
export default function Showreel({ url, title, poster }) {
  if (!url)
    return (
      <div className="relative aspect-video overflow-hidden rounded-sm bg-black">
        <span className="hud-label absolute inset-x-5 bottom-4 sm:inset-x-9 sm:bottom-8">Showreel · coming soon</span>
        <HudCorners inset="inset-4 sm:inset-6" />
      </div>
    )
  return <VideoFacade url={url} title={title} poster={poster} />
}
