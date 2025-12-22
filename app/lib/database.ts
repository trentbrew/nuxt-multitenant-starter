import Dexie, { type EntityTable } from 'dexie'
import type {
  Organization,
  Member,
  Application,
  Collection,
  DatabaseSchema,
  DatabaseRecord,
  Settings,
  Notification,
} from '~/types/database'

export class BaaSDatabase extends Dexie {
  organizations!: EntityTable<Organization, 'id'>
  members!: EntityTable<Member, 'id'>
  applications!: EntityTable<Application, 'id'>
  collections!: EntityTable<Collection, 'id'>
  databaseSchemas!: EntityTable<DatabaseSchema, 'id'>
  databaseRecords!: EntityTable<DatabaseRecord, 'id'>
  settings!: EntityTable<Settings, 'id'>
  notifications!: EntityTable<Notification, 'id'>

  constructor() {
    super('BaaSDatabase')

    this.version(1).stores({
      organizations: 'id, slug, createdAt',
      members: 'id, orgId, userId, email, status',
      applications: 'id, orgId, slug, createdAt',
      collections: 'id, appId, parentId, slug, type, order',
      databaseSchemas: 'id, collectionId',
      databaseRecords: 'id, collectionId, createdAt',
      settings: 'id, [entityType+entityId], key',
      notifications: 'id, userId, orgId, appId, isRead, createdAt',
    })
  }

  async seedInitialData() {
    const orgsCount = await this.organizations.count()
    if (orgsCount > 0) return

    const now = Date.now()

    const org1Id = crypto.randomUUID()
    const org2Id = crypto.randomUUID()
    const org3Id = crypto.randomUUID()

    await this.organizations.bulkAdd([
      {
        id: org1Id,
        name: 'Turtle Labs',
        slug: 'turtle-labs',
        plan: 'pro',
        createdAt: now,
        updatedAt: now,
      },
      {
        id: org2Id,
        name: 'Toolkit',
        slug: 'toolkit',
        plan: 'free',
        createdAt: now,
        updatedAt: now,
      },
      {
        id: org3Id,
        name: 'Personal',
        slug: 'personal',
        plan: 'free',
        createdAt: now,
        updatedAt: now,
      },
    ])

    const app1Id = crypto.randomUUID()
    const app2Id = crypto.randomUUID()
    const app3Id = crypto.randomUUID()

    await this.applications.bulkAdd([
      {
        id: app1Id,
        orgId: org1Id,
        name: 'Filegraph',
        slug: 'filegraph',
        icon: 'lucide:file-text',
        color: 'bg-primary',
        description: 'Workspace app',
        createdAt: now,
        updatedAt: now,
      },
      {
        id: app2Id,
        orgId: org1Id,
        name: 'Markform',
        slug: 'markform',
        icon: 'lucide:layout',
        color: 'bg-sky-500',
        description: 'Analytics app',
        createdAt: now,
        updatedAt: now,
      },
      {
        id: app3Id,
        orgId: org1Id,
        name: 'Nodebook',
        slug: 'nodebook',
        icon: 'lucide:book',
        color: 'bg-emerald-500',
        description: 'Library app',
        createdAt: now,
        updatedAt: now,
      },
    ])

    console.log('✅ Database seeded with initial data')
  }
}

export const db = new BaaSDatabase()
