export default defineAppConfig({
  wedding: {
    dateISO: '2026-10-18T00:00:00',
    dateDay: '18',
    dateMonth: '10',
    dateYear: '26',
    heroPhoto: '/images/hero.webp',

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

    gallery: [
      { src: '/images/gallery/1.webp', span: 'tall' },
      { src: '/images/gallery/2.webp', span: 'wide' },
      { src: '/images/gallery/3.webp', span: 'normal' },
      { src: '/images/gallery/4.webp', span: 'normal' },
      { src: '/images/gallery/5.webp', span: 'tall' },
      { src: '/images/gallery/6.webp', span: 'wide' },
    ],
  },
})
