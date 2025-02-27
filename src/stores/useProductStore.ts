import { defineStore } from 'pinia'
import { computed, onMounted, reactive, ref } from 'vue'
import { v7 as uuid } from 'uuid'

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
  const products = ref<Product[]>([])
  const query = reactive<{
    search: string
    page: number
    limit: number
    sortBy: keyof Product
    order: 'asc' | 'desc'
  }>({
    search: '',
    page: 1,
    limit: 10,
    sortBy: 'name',
    order: 'asc',
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

  const getIdByUrl = (url: string) => {
    const parts = url.split('/')
    return parts[parts.length - 2]
  }

  const fetchProduct = async () => {
    const res = await fetch(API_PRODUCTS)
    const data: ProductsResponse = await res.json()
    products.value = data.results.map((product) => ({
      id: getIdByUrl(product.url),
      name: product.name,
    }))
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

  const getProduct = (id: string) => {
    return products.value.find((product) => product.id === id)
  }

  onMounted(() => {
    fetchProduct()
  })

  return {
    paginatedProducts,
    query,
    totalPages,
    addProduct,
    deleteProduct,
    updateProduct,
    getProduct,
  }
})
