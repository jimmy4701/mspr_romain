import { db } from 'api/src/lib/db'
import { hashPassword } from '@redwoodjs/auth-dbauth-api'
// Manually apply seeds via the `yarn rw prisma db seed` command.
//
// Seeds automatically run the first time you run the `yarn rw prisma migrate dev`
// command and every time you run the `yarn rw prisma migrate reset` command.
//
// See https://redwoodjs.com/docs/database-seeds for more info

export default async () => {
  try {
    // Clean existing data
    await db.pandemicStat.deleteMany()
    await db.location.deleteMany()
    await db.disease.deleteMany()
    await db.source.deleteMany()
    await db.user.deleteMany()

    // Create users
    const users = []
    for (let i = 1; i <= 10; i++) {
      const [hashedPassword, salt] = await hashPassword(`changeme`)

      const user = await db.user.create({
        data: {
          email: `user${i}@example.com`,
          hashedPassword,
          salt,
          createdAt: new Date(2023, 0, i),
          updatedAt: new Date(),
        },
      })
      users.push(user)
    }
    console.log(`Created ${users.length} users`)

    // Create diseases
    const diseases = []
    const diseaseNames = [
      'COVID-19',
      'Influenza',
      'Malaria',
      'Tuberculosis',
      'Dengue Fever',
      'Ebola',
      'Zika',
      'MERS',
      'SARS',
      'Cholera',
      'Yellow Fever',
      'Typhoid'
    ]

    for (let i = 0; i < diseaseNames.length; i++) {
      const disease = await db.disease.create({
        data: {
          name: diseaseNames[i],
        },
      })
      diseases.push(disease)
    }
    console.log(`Created ${diseases.length} diseases`)

    // Create sources
    const sources = []
    const sourceData = [
      { name: 'World Health Organization', description: 'Official WHO data', url: 'https://www.who.int/data' },
      { name: 'Centers for Disease Control', description: 'US CDC statistics', url: 'https://www.cdc.gov/datastatistics' },
      { name: 'European Centre for Disease Prevention', description: 'EU health data', url: 'https://www.ecdc.europa.eu/en/data' },
      { name: 'Johns Hopkins University', description: 'Research data from JHU', url: 'https://coronavirus.jhu.edu/data' },
      { name: 'Our World in Data', description: 'Open source research database', url: 'https://ourworldindata.org' },
      { name: 'The Lancet', description: 'Peer-reviewed medical journal', url: 'https://www.thelancet.com' },
      { name: 'National Institutes of Health', description: 'US government medical research', url: 'https://www.nih.gov' },
      { name: 'United Nations', description: 'UN health statistics', url: 'https://www.un.org/en/global-issues/health' },
      { name: 'Africa CDC', description: 'African health data', url: 'https://africacdc.org/covid-19' },
      { name: 'Pan American Health Organization', description: 'Americas regional data', url: 'https://www.paho.org/en/data' },
    ]

    for (const source of sourceData) {
      const createdSource = await db.source.create({
        data: source,
      })
      sources.push(createdSource)
    }
    console.log(`Created ${sources.length} sources`)

    // Create locations
    const locations = []
    const locationData = [
      { country_name: 'United States', province_state: 'New York', iso_code: 'US-NY', latitude: 40.7128, longitude: -74.0060, who_region: 'AMRO' },
      { country_name: 'United Kingdom', province_state: 'England', iso_code: 'GB-ENG', latitude: 51.5074, longitude: -0.1278, who_region: 'EURO' },
      { country_name: 'France', province_state: 'Île-de-France', iso_code: 'FR-IDF', latitude: 48.8566, longitude: 2.3522, who_region: 'EURO' },
      { country_name: 'China', province_state: 'Hubei', iso_code: 'CN-HB', latitude: 30.5928, longitude: 114.3055, who_region: 'WPRO' },
      { country_name: 'India', province_state: 'Maharashtra', iso_code: 'IN-MH', latitude: 19.7515, longitude: 75.7139, who_region: 'SEARO' },
      { country_name: 'Brazil', province_state: 'São Paulo', iso_code: 'BR-SP', latitude: -23.5505, longitude: -46.6333, who_region: 'AMRO' },
      { country_name: 'South Africa', province_state: 'Gauteng', iso_code: 'ZA-GT', latitude: -26.2041, longitude: 28.0473, who_region: 'AFRO' },
      { country_name: 'Australia', province_state: 'New South Wales', iso_code: 'AU-NSW', latitude: -33.8688, longitude: 151.2093, who_region: 'WPRO' },
      { country_name: 'Japan', province_state: 'Tokyo', iso_code: 'JP-13', latitude: 35.6762, longitude: 139.6503, who_region: 'WPRO' },
      { country_name: 'Germany', province_state: 'Berlin', iso_code: 'DE-BE', latitude: 52.5200, longitude: 13.4050, who_region: 'EURO' },
      { country_name: 'Canada', province_state: 'Ontario', iso_code: 'CA-ON', latitude: 43.6532, longitude: -79.3832, who_region: 'AMRO' },
      { country_name: 'Mexico', province_state: 'Mexico City', iso_code: 'MX-CMX', latitude: 19.4326, longitude: -99.1332, who_region: 'AMRO' },
    ]

    for (const location of locationData) {
      const createdLocation = await db.location.create({
        data: location,
      })
      locations.push(createdLocation)
    }
    console.log(`Created ${locations.length} locations`)

    // Create pandemic stats with relationships to locations, diseases, and sources
    const pandemicStats = []
    const currentDate = new Date()

    for (let i = 0; i < 50; i++) {
      // Select random location, source, and 1-3 random diseases for each pandemic stat
      const randomLocation = locations[Math.floor(Math.random() * locations.length)]
      const randomSource = sources[Math.floor(Math.random() * sources.length)]

      // Generate 1-3 random distinct diseases
      const numDiseases = Math.floor(Math.random() * 3) + 1
      const selectedDiseaseIds = new Set<number>()
      while (selectedDiseaseIds.size < numDiseases) {
        const randomDiseaseId = diseases[Math.floor(Math.random() * diseases.length)].id
        selectedDiseaseIds.add(randomDiseaseId)
      }

      // Generate a date within the last 2 years
      const daysAgo = Math.floor(Math.random() * 730) // up to 2 years ago
      const statDate = new Date(currentDate)
      statDate.setDate(currentDate.getDate() - daysAgo)

      // Generate realistic statistics
      const cumulativeCases = Math.floor(Math.random() * 100000) + 1000
      const dailyNewCases = Math.floor(Math.random() * 1000) + 10
      const activeCases = Math.floor(Math.random() * 50000) + 500
      const cumulativeDeaths = Math.floor(Math.random() * 5000) + 50
      const dailyNewDeaths = Math.floor(Math.random() * 50) + 1

      const stat = await db.pandemicStat.create({
        data: {
          cumulative_cases: cumulativeCases,
          daily_new_cases: dailyNewCases,
          active_cases: activeCases,
          cumulative_deaths: cumulativeDeaths,
          daily_new_deaths: dailyNewDeaths,
          date: statDate,
          location_id: randomLocation.id,
          source_id: randomSource.id,
          diseases: {
            connect: Array.from(selectedDiseaseIds).map(id => ({ id: Number(id) })),
          },
        },
      })

      pandemicStats.push(stat)
    }
    console.log(`Created ${pandemicStats.length} pandemic statistics`)

    console.log('Database has been seeded!')
  } catch (error) {
    console.error('Error seeding database:', error)
  }
}
