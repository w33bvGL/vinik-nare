export function useProgram() {
  const { t } = useI18n()
  const config = useAppConfig()

  const items = computed(() =>
    config.wedding.program.map((item: { key: string; time: string; venueKey: string }) => ({
      time: item.time,
      title: t(`program.items.${item.key}`),
      venue: t(`venues.${item.venueKey}`),
    })),
  )

  return { items }
}
