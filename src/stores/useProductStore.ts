import { defineStore } from 'pinia'
import { computed, onMounted, reactive, ref, watchEffect } from 'vue'
import { v7 as uuid } from 'uuid'
import { loadFromLocalStorage, saveToLocalStorage, STORAGE_KEY_PRODUCTS } from '@/utils/helpers'
import { useRoute, useRouter } from 'vue-router'

type ProductsResponse = {
  count: number
  next: string | null
  previous: string | null
  results: RawProduct[]
}

type RawProduct = {
  name: string
  url: string
}

export type Product = {
  id: string
  name: string
}

type PaginatedProduct = Product & { no: number }

const API_PRODUCTS = import.meta.env.VITE_APP_API_PRODUCTS

export const useProductStore = defineStore('product', () => {
  const route = useRoute()
  const router = useRouter()
  const products = ref(loadFromLocalStorage<Product[]>(STORAGE_KEY_PRODUCTS, []))
  const query = reactive<{
    search: string
    page: number
    limit: number
    sortBy: keyof Product
    order: 'asc' | 'desc'
  }>({
    search: (route.query.search as string) || '',
    page: Number(route.query.page) || 1,
    limit: Number(route.query.limit) || 10,
    sortBy: (route.query.sortBy as keyof Product) || 'name',
    order: (route.query.order as 'asc' | 'desc') || 'asc',
  })
  const filteredProducts = computed(() =>
    products.value
      .filter((product) => product.name.toLowerCase().includes(query.search.toLowerCase()))
      .sort((a, b) => {
        const valA = a[query.sortBy]
        const valB = b[query.sortBy]
        return query.order === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA)
      })
      .map<PaginatedProduct>((product, index) => ({ ...product, no: index + 1 })),
  )
  const paginatedProducts = computed(() => {
    const start = (query.page - 1) * query.limit
    return filteredProducts.value.slice(start, start + query.limit)
  })
  const totalPages = computed(() => Math.ceil(filteredProducts.value.length / query.limit))

  const getProduct = (id: string) => {
    return products.value.find((product) => product.id === id)
  }

  const addProduct = (name: string) => {
    products.value = [...products.value, { id: uuid(), name }]
  }

  const deleteProduct = (id: string) => {
    products.value = products.value.filter((product) => product.id !== id)
  }

  const updateProduct = (updatedProduct: Product) => {
    products.value = products.value.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product,
    )
  }

  onMounted(async () => {
    if (!products.value.length) {
      const res = await fetch(API_PRODUCTS)
      const data: ProductsResponse = await res.json()
      products.value = data.results.map((product) => {
        const parts = product.url.split('/')
        return {
          id: parts[parts.length - 2],
          name: product.name,
        }
      })
    }
  })

  watchEffect(() => {
    saveToLocalStorage(STORAGE_KEY_PRODUCTS, products.value)
  })

  watchEffect(() => {
    if (route.path !== '/products') {
      query.search = ''
      query.page = 1
      query.limit = 10
      query.sortBy = 'name'
      query.order = 'asc'
    }

    const newQuery = {
      search: query.search || undefined,
      page: query.page !== 1 ? query.page : undefined,
      limit: query.limit !== 10 ? query.limit : undefined,
      sortBy: query.sortBy !== 'name' ? query.sortBy : undefined,
      order: query.order !== 'asc' ? query.order : undefined,
    }

    router.replace({ query: { ...route.query, ...newQuery } })
  })

  return {
    products,
    query,
    paginatedProducts,
    totalPages,
    getProduct,
    addProduct,
    deleteProduct,
    updateProduct,
  }
})
