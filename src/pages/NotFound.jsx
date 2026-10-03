import { Arrow, MagneticButton } from '../components/ui'

export default function NotFound() {
  return (
    <section className="container-x grid min-h-screen place-items-center py-40 text-center">
      <title>Not found — BOA Network</title>
      <div>
        <p className="hud-label mb-6">Error · 404</p>
        <h1 className="display-lg">
          Cut. <span className="accent">Wrong scene.</span>
        </h1>
        <p className="lede mx-auto mt-8 max-w-md">That page is not in the script. Let’s get you back to the start.</p>
        <div className="mt-10 flex justify-center">
          <MagneticButton to="/">
            Back to home <Arrow />
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
