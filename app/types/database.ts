export interface Organization {
  id: string
  name: string
  slug: string
  avatar?: string
  plan: 'free' | 'pro' | 'enterprise'
  createdAt: number
  updatedAt: number
}

export interface Member {
  id: string
  orgId: string
  userId: string
  email: string
  name: string
  avatar?: string
  role: 'owner' | 'admin' | 'member' | 'viewer'
  invitedAt: number
  joinedAt?: number
  status: 'pending' | 'active' | 'suspended'
}

export interface Application {
  id: string
  orgId: string
  name: string
  slug: string
  icon: string
  color: string
  description?: string
  createdAt: number
  updatedAt: number
}

export interface Collection {
  id: string
  appId: string
  parentId?: string
  title: string
  icon: string
  slug: string
  type: 'database' | 'document' | 'board' | 'calendar' | 'gallery'
  order: number
  isPublished: boolean
  createdBy: string
  createdAt: number
  updatedAt: number
}

export interface DatabaseSchema {
  id: string
  collectionId: string
  fields: DatabaseField[]
  views: DatabaseView[]
  createdAt: number
  updatedAt: number
}

export interface DatabaseField {
  id: string
  name: string
  type:
    | 'text'
    | 'number'
    | 'select'
    | 'multiselect'
    | 'date'
    | 'checkbox'
    | 'url'
    | 'email'
    | 'file'
    | 'relation'
    | 'formula'
  options?: { value: string; color: string }[]
  config?: Record<string, any>
  required: boolean
  order: number
}

export interface DatabaseView {
  id: string
  name: string
  type: 'table' | 'board' | 'calendar' | 'gallery' | 'list'
  filters: string[]
  sorts: string[]
  groupBy?: string
  isDefault: boolean
}

export interface DatabaseRecord {
  id: string
  collectionId: string
  fields: Record<string, any>
  createdBy: string
  createdAt: number
  updatedAt: number
}

export interface Settings {
  id: string
  entityType: 'org' | 'app' | 'user'
  entityId: string
  key: string
  value: any
  updatedAt: number
}

export interface Notification {
  id: string
  userId: string
  orgId: string
  appId?: string
  type: 'invite' | 'mention' | 'update' | 'system'
  title: string
  message: string
  actionUrl?: string
  isRead: boolean
  createdAt: number
}
