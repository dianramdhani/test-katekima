<script setup lang="ts">
import { useProductStore, type Product } from '@/stores/useProductStore'
import { storeToRefs } from 'pinia'
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const store = useProductStore()
const { getProduct } = store
const { products } = storeToRefs(store)
const product = ref<Product>()

watchEffect(() => {
  product.value = getProduct(route.params.id as string)
})
</script>

<template>
  <select
    :value="$route.params.id"
    @change="(e) => $router.push(`/products/detail/${(e.target as HTMLSelectElement).value}`)"
  >
    <option v-for="product in products" :key="product.id" :value="product.id">
      {{ product.name }}
    </option>
  </select>
  <div>{{ product?.name }}</div>
</template>
