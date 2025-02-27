<script setup lang="ts">
import { Bars3Icon } from '@heroicons/vue/24/solid'
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="drawer lg:drawer-open">
    <input id="sidebar-drawer" type="checkbox" class="drawer-toggle" />

    <!-- Main Content -->
    <div class="drawer-content flex flex-col min-h-screen">
      <!-- Header -->
      <header class="bg-base-300 p-4 shadow-md flex items-center h-18">
        <label for="sidebar-drawer" class="btn btn-primary drawer-button lg:hidden">
          <Bars3Icon class="h-5 inline-block w-5" />
        </label>
      </header>

      <!-- Page Content -->
      <main class="flex-1 p-4 overflow-auto">
        <RouterView />
      </main>

      <!-- Footer -->
      <footer class="bg-base-300 p-4 text-center">
        <p>&copy; 2025 My App</p>
      </footer>
    </div>

    <!-- Sidebar -->
    <aside class="drawer-side">
      <label for="sidebar-drawer" class="drawer-overlay"></label>
      <div class="menu p-4 w-64 bg-base-200 min-h-full">
        <h2 class="text-xl font-bold mb-4">Menu</h2>
        <ul>
          <li><RouterLink to="/products">Produk</RouterLink></li>
        </ul>
      </div>
    </aside>
  </div>
</template>
