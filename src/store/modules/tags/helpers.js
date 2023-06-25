// tag所需要的数据

import { sStorage } from '@/utils'

export const activeTag = sStorage.get('activeTag')
export const tags = sStorage.get('tags')

export const WITHOUT_TAG_PATHS = ['/404', '/login']