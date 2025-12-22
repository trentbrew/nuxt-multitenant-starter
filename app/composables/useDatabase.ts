import { db } from '~/lib/database'
import type { Organization, Member, Application, Collection, DatabaseSchema, Notification } from '~/types/database'

export function useDatabase() {
  const currentOrg = useState<Organization | null>('currentOrg', () => null)
  const currentApp = useState<Application | null>('currentApp', () => null)

  return {
    db,

    organizations: {
      list: () => db.organizations.toArray(),
      get: (id: string) => db.organizations.get(id),
      getBySlug: (slug: string) => db.organizations.where('slug').equals(slug).first(),
      create: (data: Omit<Organization, 'id' | 'createdAt' | 'updatedAt'>) => {
        const now = Date.now()
        return db.organizations.add({
          ...data,
          id: crypto.randomUUID(),
          createdAt: now,
          updatedAt: now,
        })
      },
      update: (id: string, data: Partial<Organization>) => {
        return db.organizations.update(id, { ...data, updatedAt: Date.now() })
      },
      delete: (id: string) => db.organizations.delete(id),
    },

    members: {
      list: (orgId: string) => db.members.where('orgId').equals(orgId).toArray(),
      get: (id: string) => db.members.get(id),
      create: (data: Omit<Member, 'id' | 'invitedAt'>) => {
        return db.members.add({
          ...data,
          id: crypto.randomUUID(),
          invitedAt: Date.now(),
        })
      },
      update: (id: string, data: Partial<Member>) => db.members.update(id, data),
      delete: (id: string) => db.members.delete(id),
    },

    applications: {
      list: (orgId: string) => db.applications.where('orgId').equals(orgId).toArray(),
      get: (id: string) => db.applications.get(id),
      getBySlug: (orgId: string, slug: string) => db.applications.where({ orgId, slug }).first(),
      create: (data: Omit<Application, 'id' | 'createdAt' | 'updatedAt'>) => {
        const now = Date.now()
        return db.applications.add({
          ...data,
          id: crypto.randomUUID(),
          createdAt: now,
          updatedAt: now,
        })
      },
      update: (id: string, data: Partial<Application>) => {
        return db.applications.update(id, { ...data, updatedAt: Date.now() })
      },
      delete: (id: string) => db.applications.delete(id),
    },

    collections: {
      list: (appId: string) => db.collections.where('appId').equals(appId).sortBy('order'),
      get: (id: string) => db.collections.get(id),
      getBySlug: (appId: string, slug: string) => db.collections.where({ appId, slug }).first(),
      getChildren: (parentId: string) => db.collections.where('parentId').equals(parentId).sortBy('order'),
      create: (data: Omit<Collection, 'id' | 'createdAt' | 'updatedAt'>) => {
        const now = Date.now()
        return db.collections.add({
          ...data,
          id: crypto.randomUUID(),
          createdAt: now,
          updatedAt: now,
        })
      },
      update: (id: string, data: Partial<Collection>) => {
        return db.collections.update(id, { ...data, updatedAt: Date.now() })
      },
      delete: (id: string) => db.collections.delete(id),
    },

    schemas: {
      get: (collectionId: string) => db.databaseSchemas.where('collectionId').equals(collectionId).first(),
      create: (data: Omit<DatabaseSchema, 'id' | 'createdAt' | 'updatedAt'>) => {
        const now = Date.now()
        return db.databaseSchemas.add({
          ...data,
          id: crypto.randomUUID(),
          createdAt: now,
          updatedAt: now,
        })
      },
      update: (id: string, data: Partial<DatabaseSchema>) => {
        return db.databaseSchemas.update(id, { ...data, updatedAt: Date.now() })
      },
      delete: (id: string) => db.databaseSchemas.delete(id),
    },

    records: {
      list: (collectionId: string) => db.databaseRecords.where('collectionId').equals(collectionId).toArray(),
      get: (id: string) => db.databaseRecords.get(id),
      create: (collectionId: string, fields: Record<string, any>, userId: string) => {
        const now = Date.now()
        return db.databaseRecords.add({
          id: crypto.randomUUID(),
          collectionId,
          fields,
          createdBy: userId,
          createdAt: now,
          updatedAt: now,
        })
      },
      update: (id: string, fields: Record<string, any>) => {
        return db.databaseRecords.update(id, { fields, updatedAt: Date.now() })
      },
      delete: (id: string) => db.databaseRecords.delete(id),
    },

    settings: {
      get: (entityType: string, entityId: string, key: string) =>
        db.settings.where({ entityType, entityId, key }).first(),
      list: (entityType: string, entityId: string) => db.settings.where({ entityType, entityId }).toArray(),
      set: (entityType: 'org' | 'app' | 'user', entityId: string, key: string, value: any) => {
        return db.settings.put({
          id: `${entityType}-${entityId}-${key}`,
          entityType,
          entityId,
          key,
          value,
          updatedAt: Date.now(),
        })
      },
      delete: (id: string) => db.settings.delete(id),
    },

    notifications: {
      list: (userId: string) => db.notifications.where('userId').equals(userId).reverse().sortBy('createdAt'),
      getUnread: (userId: string) => db.notifications.where({ userId, isRead: false }).toArray(),
      create: (data: Omit<Notification, 'id' | 'createdAt'>) => {
        return db.notifications.add({
          ...data,
          id: crypto.randomUUID(),
          createdAt: Date.now(),
        })
      },
      markAsRead: (id: string) => db.notifications.update(id, { isRead: true }),
      markAllAsRead: (userId: string) => db.notifications.where({ userId, isRead: false }).modify({ isRead: true }),
      delete: (id: string) => db.notifications.delete(id),
    },

    currentOrg,
    currentApp,
  }
}
