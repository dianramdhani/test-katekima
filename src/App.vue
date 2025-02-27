<script setup lang="ts">
import { RouterView } from 'vue-router'
import TopBar from './components/TopBar.vue'
import BottomBar from './components/BottomBar.vue'
import SideBar from './components/SideBar.vue'
</script>

<template>
  <div class="drawer lg:drawer-open">
    <input id="sidebar-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col min-h-screen">
      <TopBar />
      <main class="flex-1 p-4 overflow-auto">
        <RouterView />
      </main>
      <BottomBar />
    </div>
    <SideBar />
  </div>
</template>
