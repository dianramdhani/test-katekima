<script setup lang="ts">
import { useNameStore } from '@/stores/useNameStore'
import { useProductStore } from '@/stores/useProductStore'
import { storeToRefs } from 'pinia'
import { ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const { getProduct, addProduct, updateProduct } = useProductStore()
const { names } = storeToRefs(useNameStore())
const name = ref('')

const onSubmit = () => {
  if (route.params.id) updateProduct({ id: route.params.id as string, name: name.value })
  else addProduct(name.value)

  router.push('/products')
}

watchEffect(() => {
  const selectedProduct = getProduct(route.params.id as string)
  if (selectedProduct) name.value = selectedProduct.name
})
</script>

<template>
  <form @submit.prevent="onSubmit">
    <select name="_name" id="_name">
      <option v-for="(name, index) in names" :key="index" :value="name">{{ name }}</option>
    </select>
    <input name="name" id="name" v-model="name" />
    <button type="submit">Simpan</button>
  </form>
</template>
