<template>
  <div id="header">
    <div class="header_section">
      <div id="name">
        SHUN SASAGURI
      </div>
      <div id="role">
        Visual Programmer
      </div>
    </div>
    <div class="header_section">
      <div id="pages">
        <div
          v-for="page in pages"
          class="page"
        >
          <NuxtLink
            :to="page"
            class="page_link"
          >
            {{ page.toUpperCase() }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const pages = ['about', 'works'];
</script>

<style scoped>
#header {
  position: absolute;
  width: 100vw;
  height: min(250px, max(100px, 25vh));
  top: 50vh;
  transform: translate(0, -50%);
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  z-index: 1;
  background-color: #000000;
}

.header_section {
  padding: 20px 0 20px 0;
  background-color: #000000;
  width: 100vw
}

#name {
  color: #FFFFFF;
  font-size: min(50px, max(30px, 4vw));
  font-family: 'Montserrat', sans-serif;
  text-align: center;
}

#role {
  color: #FFFFFF;
  font-size: min(25px, max(15px, 2vw));
  font-family: 'Montserrat', sans-serif;
  text-align: center;
}

#pages {
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-content: center;
  list-style: none;
}

.page {
  margin: 0 5vw 0 5vw;
}

.page_link {
  text-decoration: none;
  color: #FFFFFF;
  font-size: min(25px, max(15px, 2vw));
  opacity: 1;
  transition: 0.2s;
  font-family: 'Montserrat', sans-serif;
}

.page_link:hover {
  opacity: 0.5;
}
</style>
