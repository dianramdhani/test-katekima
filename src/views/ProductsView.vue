<script setup lang="ts">
import { useProductStore } from '@/stores/useProductStore'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import { RouterLink } from 'vue-router'
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/vue/24/solid'

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
  <div class="p-6 bg-base-100 rounded-lg shadow">
    <!-- Header Card -->
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold">Produk</h2>
      <span class="flex items-center gap-1">
        <input
          type="text"
          v-model="query.search"
          placeholder="Cari produk"
          class="input input-bordered w-64"
        />
        <select v-model="query.limit" class="select select-bordered">
          <option :value="10">10</option>
          <option :value="30">30</option>
          <option :value="50">50</option>
        </select>
        <RouterLink to="/products/form">
          <button class="btn btn-primary btn-circle">
            <PlusIcon class="w-6 h-6" />
          </button>
        </RouterLink>
      </span>
    </div>

    <!-- Table -->
    <table class="table w-full">
      <thead>
        <tr>
          <th>No</th>
          <th @click="query.order = query.order === 'asc' ? 'desc' : 'asc'" class="cursor-pointer">
            Nama <span>{{ query.order.toUpperCase() }}</span>
          </th>
          <th class="text-right">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id" class="hover:bg-base-200">
          <td>{{ product.no }}</td>
          <td>{{ product.name }}</td>
          <td class="text-right">
            <div class="flex justify-end gap-2">
              <RouterLink :to="`/products/detail/${product.id}`">
                <button class="btn btn-sm btn-info btn-circle">
                  <EyeIcon class="w-5 h-5" />
                </button>
              </RouterLink>
              <RouterLink :to="`/products/form/${product.id}`">
                <button class="btn btn-sm btn-warning btn-circle">
                  <PencilIcon class="w-5 h-5" />
                </button>
              </RouterLink>
              <button class="btn btn-sm btn-error btn-circle" @click="deleteProduct(product.id)">
                <TrashIcon class="w-5 h-5" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="flex justify-between items-center mt-4">
      <p>Page: {{ query.page }}</p>
      <div class="flex gap-2">
        <button class="btn btn-sm btn-outline" :disabled="query.page === 1" @click="--query.page">
          <ChevronLeftIcon class="w-5 h-5" />
        </button>
        <button
          class="btn btn-sm btn-outline"
          :disabled="query.page === totalPages"
          @click="++query.page"
        >
          <ChevronRightIcon class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>
