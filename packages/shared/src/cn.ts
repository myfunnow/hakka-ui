import { createTwMerge } from '@myfunnow/web-core/ui'

/** Joins any class value Vue accepts, then lets the last conflicting utility win (`p-2 p-4` becomes `p-4`). */
export const cn = createTwMerge()
