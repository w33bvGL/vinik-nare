export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { attendance, name, guests, wish, side } = await readBody(event)

  const sideLabel =
    side === 'bride' ? 'Невесты (Нарэ)' :
    side === 'groom' ? 'Жениха (Виника)' : '—'

  const lines = [
    '<b>🎊 Новый RSVP</b>',
    '',
    `<b>Имя:</b> ${name}`,
    `<b>Присутствие:</b> ${attendance === 'yes' ? '✓ Буду' : '✗ Не смогу'}`,
  ]

  if (attendance === 'yes' && guests) {
    lines.push(`<b>Гостей:</b> ${guests}`)
  }

  if (side) {
    lines.push(`<b>Сторона:</b> ${sideLabel}`)
  }

  if (wish?.trim()) {
    lines.push(`<b>Пожелание:</b> ${wish.trim()}`)
  }

  const res = await fetch(
    `https://api.telegram.org/bot${config.telegramBotToken}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: config.telegramChatId,
        text: lines.join('\n'),
        parse_mode: 'HTML',
      }),
    },
  )

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw createError({ statusCode: 502, statusMessage: `Telegram: ${JSON.stringify(err)}` })
  }

  return { ok: true }
})
