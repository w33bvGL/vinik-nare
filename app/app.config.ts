export default defineAppConfig({
  wedding: {
    dateISO: '2026-10-18T00:00:00',
    dateDay: '18',
    dateMonth: '10',
    dateYear: '26',
    heroPhoto: '/images/hero.jpg',

    venues: {
      hall:   { mapsUrl: 'https://maps.app.goo.gl/AUJFmXNE2w8U89dL9' },
      church: { mapsUrl: 'https://maps.app.goo.gl/Q4TfkThGwWikThZU9' },
    },

    rsvpEndpoint: '',

    program: [
      { key: 'ceremony', time: '15:00', venueKey: 'church', photo: '/images/program/1.webp', mapsUrl: 'https://maps.app.goo.gl/Q4TfkThGwWikThZU9' },
      { key: 'banquet',  time: '18:00', venueKey: 'hall',   photo: '/images/program/2.webp', mapsUrl: 'https://maps.app.goo.gl/AUJFmXNE2w8U89dL9' },
    ],

    stages: [
      { key: 'meeting',  year: '2024', photo: '/images/stages/1.webp' },
      { key: 'dating',   year: '2024', photo: '/images/stages/2.webp' },
      { key: 'proposal', year: '2025', photo: '/images/stages/3.webp' },
      { key: 'wedding',  year: '2026', photo: '/images/stages/4.webp' },
    ],
  },
})
