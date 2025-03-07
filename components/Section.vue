<template>
  <div id="section">
    <h1 id="h1">
      {{ props.title }}
    </h1>
    <div id="content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  title: string;
}
const props = defineProps<Props>();
</script>

<style scoped>
#section {
  padding-bottom: 1vh;
}

#h1 {
  color: #FFFFFF;
  font-size: 24px;
  font-weight: normal;
}

#content {
  color: #FFFFFF;
  font-size: 14px;
}
</style>
