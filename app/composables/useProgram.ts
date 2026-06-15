export function useProgram() {
  const { t } = useI18n()
  const config = useAppConfig()

  const items = computed(() =>
    config.wedding.program.map((item: {
      key: string
      time: string
      venueKey: string
      photo?: string
      mapsUrl?: string
    }) => ({
      time:    item.time,
      title:   t(`program.items.${item.key}.title`),
      desc:    t(`program.items.${item.key}.desc`),
      venue:   t(`venues.${item.venueKey}`),
      photo:   item.photo ?? '',
      mapsUrl: item.mapsUrl ?? '',
    })),
  )

  return { items }
}
