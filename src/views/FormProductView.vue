<script setup lang="ts">
import { useNameStore } from '@/stores/useNameStore'
import { useProductStore } from '@/stores/useProductStore'
import { storeToRefs } from 'pinia'
import { computed, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const { getProduct, addProduct, updateProduct } = useProductStore()
const { names } = storeToRefs(useNameStore())
const name = ref('')
const isDropdownOpen = ref(false)
const filteredNames = computed(() =>
  names.value.filter((n) => n.toLowerCase().includes(name.value.toLowerCase())),
)
const isEdit = computed(() => !!route.params.id)

const onSelectName = (selectedName: string) => {
  name.value = selectedName
  isDropdownOpen.value = false
}

const onSubmit = () => {
  if (route.params.id) updateProduct({ id: route.params.id as string, name: name.value })
  else addProduct(name.value)

  router.replace('/products')
}

watchEffect(() => {
  const selectedProduct = getProduct(route.params.id as string)
  if (selectedProduct) name.value = selectedProduct.name
})
</script>

<template>
  <div class="p-6 bg-base-100 rounded-lg shadow w-full">
    <h2 class="text-xl font-bold mb-4">
      {{ isEdit ? $t('common.formEdit') : $t('common.formCreate') }}
    </h2>
    <form @submit.prevent="onSubmit" class="space-y-4">
      <div class="form-control relative">
        <label for="name" class="label"
          >{{ $t('common.select') }} / {{ $t('product.inputName') }}</label
        >
        <input
          id="name"
          v-model="name"
          class="input input-bordered w-full"
          :placeholder="$t('product.selectOrInputName')"
          @focus="isDropdownOpen = true"
          @input="isDropdownOpen = true"
          @blur="isDropdownOpen = false"
        />

        <!-- Dropdown -->
        <ul
          v-if="isDropdownOpen && filteredNames.length"
          class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg"
        >
          <li
            v-for="(item, index) in filteredNames"
            :key="index"
            @mousedown.prevent="onSelectName(item)"
            class="p-2 hover:bg-gray-100 cursor-pointer"
          >
            {{ item }}
          </li>
        </ul>
      </div>

      <button type="submit" class="btn btn-primary w-full">{{ $t('common.save') }}</button>
    </form>
  </div>
</template>
