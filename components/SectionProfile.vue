<template>
  <Section title="">
    <div class="container">
      <img
        id="image"
        src="@/assets/image/profile.jpg"
        alt="profile"
      >
    </div>
    <div class="container">
      <p>笹栗 峻 / Shun Sasaguri</p>
      <p>2001年生まれ, Visual Programmer</p>
      <p>リアルタイムグラフィックスを中心とした多様な技術を用いて、映像、VJ、インスタレーションなど幅広く制作活動を行う。</p>
      <p>TParty所属</p>
    </div>
    <div class="container">
      <a
        v-for="link in links"
        id="link"
        :key="link.title"
        :href="link.url"
      >{{ link.title }}</a>
    </div>
  </Section>
</template>

<script lang="ts" setup>
const links = [
  {
    title: 'sasaguri.sh@gmail.com',
    url: 'mailto:sasaguri.sh@gmail.com',
  },
  {
    title: 'X',
    url: 'https://x.com/shun_5a/',
  },
  {
    title: 'Instagram',
    url: 'https://www.instagram.com/shun_5a/',
  },
  {
    title: 'Github',
    url: 'https://github.com/shun-5a/',
  },
];
</script>

<style scoped>
.container {
  padding-bottom: 1vh;
}

#image {
  width: min(50%, 500px);
}

#link {
  text-decoration: none;
  color: #FFFFFF;
  padding-right: 10px;
  opacity: 1;
}

#link:hover {
  opacity: 0.5;
}
</style>
