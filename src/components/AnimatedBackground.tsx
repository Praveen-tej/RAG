function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-gray-950">
      <div className="absolute inset-0 bg-linear-to-br from-violet-900/30 via-gray-950 to-cyan-900/30 animate-pulse" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl animate-pulse" />
    </div>
  )
}

export default AnimatedBackground