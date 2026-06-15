export default defineAppConfig({
  wedding: {
    dateISO: '2026-10-18T00:00:00',
    dateDay: '18',
    dateMonth: '10',
    dateYear: '26',

    venue: {
      mapsUrl: 'https://maps.google.com',
    },

    rsvpEndpoint: '',

    program: [
      { key: 'gathering', time: '16:30', venueKey: 'main' },
      { key: 'ceremony',  time: '17:00', venueKey: 'registry' },
      { key: 'banquet',   time: '19:00', venueKey: 'main' },
    ],

    stages: [
      { key: 'meeting',  year: '2020', photo: '/images/stages/1.jpg' },
      { key: 'dating',   year: '2021', photo: '/images/stages/2.webp' },
      { key: 'proposal', year: '2023', photo: '/images/stages/3.jpg' },
      { key: 'wedding',  year: '2026', photo: '/images/stages/4.jpg' },
    ],
  },
})
