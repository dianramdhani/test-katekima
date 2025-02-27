import { loadFromLocalStorage, saveToLocalStorage, STORAGE_KEY_NAMES } from '@/utils/helpers'
import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'

type RawName = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: Rating
}

type Rating = {
  rate: number
  count: number
}

export const useNameStore = defineStore('name', () => {
  const names = ref(loadFromLocalStorage<string[]>(STORAGE_KEY_NAMES, []))

  onMounted(async () => {
    if (!names.value.length) {
      const res = await fetch(import.meta.env.VITE_APP_API_NAMES)
      const data: RawName[] = await res.json()
      names.value = data.map((name) => name.title)
      saveToLocalStorage(STORAGE_KEY_NAMES, names.value)
    }
  })

  return { names }
})
