<script setup lang="ts">
import { useProductStore, type Product } from '@/stores/useProductStore'
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { getProduct } = useProductStore()
const product = ref<Product>()

watchEffect(() => {
  product.value = getProduct(route.params.id as string)
})
</script>

<template>
  <div>{{ product?.name }}</div>
</template>
