export type ReadingQueueKey = 'community' | 'professional'
export type ReadingDayKey = 'wednesday' | 'thursday' | 'saturday'

export interface ReadingEntry {
  id: string
  author: string
  work?: string
  strikes: number
  paused?: boolean
  position: number
}

export interface ReadingDay {
  key: ReadingDayKey
  label: string
  shortLabel: string
  queue: ReadingQueueKey
  note: string
}

const emptyQueues = (): Record<ReadingQueueKey, ReadingEntry[]> => ({ community: [], professional: [] })

export const readingDays: ReadingDay[] = [
  { key: 'wednesday', label: 'Miércoles', shortLabel: 'Mié', queue: 'community', note: 'Lectura entre miembros · comparte lista con el sábado' },
  { key: 'thursday', label: 'Jueves', shortLabel: 'Jue', queue: 'professional', note: 'Lectura profesional · lista independiente' },
  { key: 'saturday', label: 'Sábado', shortLabel: 'Sáb', queue: 'community', note: 'Lectura entre miembros · comparte lista con el miércoles' },
]

export function useReadingSchedule() {
  const { data: queues, status, error, refresh } = useFetch('/api/readings', { default: emptyQueues })

  const mutate = async (id: string, body: Record<string, unknown>) => {
    await $fetch(`/api/readings/${id}`, { method: 'PATCH', body })
    await refresh()
  }

  return {
    queues,
    status,
    error,
    refresh,
    markRead: (queue: ReadingQueueKey, id: string) => mutate(id, { action: 'read', queue }),
    markAbsent: (queue: ReadingQueueKey, id: string) => mutate(id, { action: 'absent', queue }),
    moveEntry: (id: string, direction: 'up' | 'down') => mutate(id, { action: 'move', direction }),
    addEntry: async (queue: ReadingQueueKey, author: string, work: string) => {
      await $fetch('/api/readings', { method: 'POST', body: { queue, author, work } })
      await refresh()
    },
    removeEntry: async (_queue: ReadingQueueKey, id: string) => {
      await $fetch(`/api/readings/${id}`, { method: 'DELETE' })
      await refresh()
    },
  }
}
