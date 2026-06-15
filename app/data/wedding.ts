export const wedding = {
  groom: 'Виник',
  bride: 'Нарэ',

  date: new Date('2026-09-17T17:00:00'),
  dateDay: '17',
  dateMonth: '09',
  dateYear: '26',
  dateFormatted: '17 сентября 2026',

  venue: {
    name: 'Ресторан «Название»',
    address: 'г. Москва, ул. Пушкина, д. 1',
    mapsUrl: 'https://maps.google.com',
  },

  program: [
    {
      time: '16:30',
      title: 'Сбор гостей',
      venue: 'Ресторан «Название»',
    },
    {
      time: '17:00',
      title: 'Торжественная церемония',
      venue: 'ЗАГС Центрального района',
    },
    {
      time: '19:00',
      title: 'Праздничный банкет',
      venue: 'Ресторан «Название»',
    },
  ],

  dressCode: {
    text: 'Просим вас придерживаться тёплых натуральных тонов. Избегайте ярких и насыщенных цветов.',
    palette: [
      { hex: '#e9e5e2', label: 'Бежевый' },
      { hex: '#dad3cd', label: 'Нюд' },
      { hex: '#917e6e', label: 'Тауп' },
      { hex: '#201913', label: 'Шоколад' },
    ],
  },

  rsvpDeadline: '1 сентября 2026',

  rsvpEndpoint: '',
}
