import { db } from '~/lib/database'

export default defineNuxtPlugin(async () => {
  await db.seedInitialData()

  return {
    provide: {
      db,
    },
  }
})
