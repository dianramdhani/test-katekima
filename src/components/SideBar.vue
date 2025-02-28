<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <aside class="drawer-side">
    <label for="sidebar-drawer" class="drawer-overlay"></label>
    <div class="menu p-4 w-64 bg-base-200 min-h-full">
      <h2 class="text-xl font-bold mb-4">Katekima</h2>
      <ul>
        <li>
          <RouterLink to="/products">{{ $t('product.product') }}</RouterLink>
        </li>
      </ul>
    </div>
  </aside>
</template>
