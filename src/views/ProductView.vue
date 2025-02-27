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
const selectedIdProduct = ref(Number(route.params.id))

watchEffect(() => {
  product.value = getProduct(route.params.id as string)
})
</script>

<template>
  <div class="p-6 bg-base-100 rounded-lg shadow w-full">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold">Detail Produk</h2>
      <form
        @submit.prevent="$router.replace(`/products/detail/${selectedIdProduct}`)"
        class="flex items-center gap-1"
      >
        <select id="product" v-model="selectedIdProduct" class="select select-bordered">
          <option v-for="product in products" :key="product.id" :value="product.id">
            {{ product.name }}
          </option>
        </select>

        <button type="submit" class="btn btn-primary">Pindah</button>
      </form>
    </div>

    <div
      v-if="product"
      class="h-96 flex items-center justify-center mt-6 p-4 bg-gray-100 rounded-md text-lg font-semibold"
    >
      Nama: {{ product?.name }}
    </div>
  </div>
</template>
