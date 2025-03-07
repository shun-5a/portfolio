<template>
  <div id="header">
    <div id="header_container">
      <div>
        <NuxtLink
          id="name"
          to="/"
        >
          SHUN SASAGURI
        </NuxtLink>
      </div>
      <nav>
        <ul id="nav_ul">
          <li
            v-for="page in pages"
            id="nav_li"
          >
            <NuxtLink
              :to="page"
              class="nav"
            >
              {{ page.toUpperCase() }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script lang="ts" setup>
const pages = ['about', 'works'];
</script>

<style scoped>
#header_container {
  margin: 1vh 5vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#name {
  text-decoration: none;
  color: #FFFFFF;
  font-size: max(20px, min(30px, 3vw));
  font-family: 'Montserrat', sans-serif;
}

#nav_ul {
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
}

#nav_li {
  margin-left: 5vw;
}

.nav {
  text-decoration: none;
  color: #FFFFFF;
  font-size: max(14px, min(20px, 2vw));
  opacity: 1;
  transition: 0.2s;
  font-family: 'Montserrat', sans-serif;
}

.nav:hover {
 opacity: 0.5;
}
</style>
