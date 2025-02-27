import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'

const API_NAMES = 'https://fakestoreapi.com/products'

export const useProductStore = defineStore('product', () => {
  const names = ref([])

  onMounted(async () => {
    const res = await fetch(API_NAMES)
    const data = await res.json()
    console.log('names:', data)
  })

  return { names }
})
