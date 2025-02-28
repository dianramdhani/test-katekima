<script setup lang="ts">
import { saveToLocalStorage, STORAGE_KEY_LANG } from '@/utils/helpers'
import { Bars3Icon } from '@heroicons/vue/24/solid'
import { watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()

watchEffect(() => {
  saveToLocalStorage(STORAGE_KEY_LANG, locale.value)
})
</script>

<template>
  <header class="bg-base-300 p-4 shadow-md flex items-center justify-between">
    <label for="sidebar-drawer" class="btn btn-primary drawer-button lg:hidden">
      <Bars3Icon class="h-5 inline-block w-5" />
    </label>
    <select v-model="locale" class="select select-bordered w-40 lg:ml-auto">
      <option value="id">Indonesia</option>
      <option value="en">English</option>
    </select>
  </header>
</template>
