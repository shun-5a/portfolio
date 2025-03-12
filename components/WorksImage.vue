<template>
  <div id="image_container">
    <a
      id="link"
      :href="props.link"
    >
      <img
        id="image"
        :src="props.src"
      >
      <p id="title">{{ props.title }}</p>
    </a>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  link: string;
  src: string;
  title: string;
}
const props = defineProps<Props>();
</script>

<style scoped>
#image_container {
  width: max(50%, 300px);
  height: auto;
  padding: 0 5vw 5vh 5vw;
}

#image {
  width: 100%;
  height: auto;
  transition: 0.2s;
  scale: 1;
}

#image:hover {
  scale: 1.05;
}

#link {
  text-decoration: none;
}

#title {
  color: #FFFFFF;
  font-size: 20px;
}

#title:hover {
  opacity: 0.5;
}
</style>
