import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
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

type Product = {
  id: string
  name: string
}

const API_PRODUCTS = import.meta.env.VITE_APP_API_PRODUCTS

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([])

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

  return { products, addProduct, deleteProduct, updateProduct, getProduct }
})
