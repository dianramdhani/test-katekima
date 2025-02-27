<script setup lang="ts">
import { useProductStore } from '@/stores/useProductStore'
import { storeToRefs } from 'pinia'
import { watchEffect } from 'vue'
import { RouterLink } from 'vue-router'

const store = useProductStore()
const { deleteProduct } = store
const { products } = storeToRefs(store)

watchEffect(() => {
  console.log(products)
})
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>No</th>
        <th>Nama</th>
        <th>Aksi</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(product, index) in products" :key="product.id">
        <td>{{ index + 1 }}</td>
        <td>{{ product.name }}</td>
        <td>
          <RouterLink :to="`/products/detail/${product.id}`">
            <button>detail</button>
          </RouterLink>
          <RouterLink :to="`/products/form/${product.id}`">
            <button>edit</button>
          </RouterLink>
          <button @click="() => deleteProduct(product.id)">delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
