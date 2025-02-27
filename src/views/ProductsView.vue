<script setup lang="ts">
import { useProductStore } from '@/stores/useProductStore'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import { RouterLink } from 'vue-router'

const store = useProductStore()
const { deleteProduct } = store
const { paginatedProducts: products, query, totalPages } = storeToRefs(store)

watch(
  () => query.value.search,
  () => {
    query.value.page = 1
  },
)
</script>

<template>
  <div>
    <RouterLink to="/products/form">
      <button>tambah</button>
    </RouterLink>
    <input type="text" v-model="query.search" />
    <select v-model="query.limit">
      <option :value="10">10</option>
      <option :value="30">30</option>
      <option :value="50">50</option>
    </select>
  </div>
  <table>
    <thead>
      <tr>
        <th>No</th>
        <th @click="() => (query.order = query.order === 'asc' ? 'desc' : 'asc')">
          Nama <span>{{ query.order.toUpperCase() }}</span>
        </th>
        <th>Aksi</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.no }}</td>
        <td>
          {{ product.name }}
        </td>
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
  Page: {{ query.page }}
  <button :disabled="query.page === 1" @click="() => --query.page">prev</button>
  <button :disabled="query.page === totalPages" @click="() => ++query.page">next</button>
</template>
