export function useCountdown() {
  const config = useAppConfig()
  const weddingDate = new Date(config.wedding.dateISO)

  const days    = ref(0)
  const hours   = ref(0)
  const minutes = ref(0)
  const seconds = ref(0)
  const isPast  = ref(false)
  const ticking = ref(false)

  function compute() {
    const diff = weddingDate.getTime() - Date.now()
    if (diff <= 0) {
      isPast.value = true
      days.value = hours.value = minutes.value = seconds.value = 0
      return
    }

    days.value    = Math.floor(diff / 86_400_000)
    hours.value   = Math.floor((diff % 86_400_000) / 3_600_000)
    minutes.value = Math.floor((diff % 3_600_000) / 60_000)

    const next = Math.floor((diff % 60_000) / 1000)
    if (next !== seconds.value) {
      seconds.value = next
      ticking.value = true
      setTimeout(() => { ticking.value = false }, 80)
    }
  }

  let interval: ReturnType<typeof setInterval> | null = null

  onMounted(() => {
    compute()
    interval = setInterval(compute, 1000)
  })

  onUnmounted(() => {
    if (interval) clearInterval(interval)
  })

  return { days, hours, minutes, seconds, isPast, ticking }
}
