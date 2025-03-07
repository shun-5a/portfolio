<template>
  <div id="layout">
    <Header />
    <slot />
    <Footer />
  </div>
</template>

<script lang="ts" setup>
</script>

<style>
#layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
