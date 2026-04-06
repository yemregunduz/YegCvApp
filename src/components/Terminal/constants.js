export function getShutdownLines(t) {
  return [
    { text: t.shutdown.saving, delay: 0 },
    { text: t.shutdown.closing, delay: 400 },
    { text: t.shutdown.stopping, delay: 800 },
    { text: t.shutdown.complete, delay: 1200 },
  ]
}

export function getBootLines(t) {
  return [
    { text: t.shutdown.booting, delay: 0 },
    { text: t.shutdown.loading, delay: 300 },
    { text: t.shutdown.initializing, delay: 600 },
    { text: t.shutdown.ready, delay: 900 },
  ]
}
