<template>
  <Section title="">
    <div id="images">
      <WorksImage
        v-for="link in links"
        :key="link.title"
        :title="link.title"
        :link="link.link"
        :src="link.src"
      />
    </div>
  </Section>
</template>

<script lang="ts" setup>
const links = [
  {
    title: 'tokens',
    link: 'https://vimeo.com/1021572338',
    src: './image/tokens.jpg',
  },
  {
    title: 'TParty × 武蔵美電音研 合同研究発表会 Synthetica',
    link: 'https://shun-5a.notion.site/TParty-Synthetica-1af2857f1fd680bfa10eeb2d6b0b1c47?pvs=4',
    src: './image/synthetica.jpg',
  },
  {
    title: 'J-WAVE INNOVATION WORLD FESTA 2022',
    link: 'https://shun-5a.notion.site/J-WAVE-INNOVATION-WORLD-FESTA-2022-1af2857f1fd6803498cddae6527bfb2a?pvs=4',
    src: './image/innofes2022.jpg',
  },
  {
    title: 'シブキ',
    link: 'https://youtu.be/tRubYTfBBGc?feature=shared',
    src: './image/shibuki.jpg',
  },
  {
    title: 'J-WAVE INNOVATION WORLD FESTA 2021',
    link: 'https://shun-5a.notion.site/J-WAVE-INNOVATION-WORLD-FESTA-2021-1af2857f1fd680bbb929d9b58d1e7a3f?pvs=4',
    src: './image/innofes2021.jpg',
  },
  {
    title: 'DJ Robotics Lynx Opening Event',
    link: 'https://shun-5a.notion.site/DJ-Robotics-Lynx-Opening-Event-1ac2857f1fd680b9ad55ed173e3d5c87?pvs=4',
    src: './image/djroboticslynx.jpg',
  },
];
</script>

<style>
#images {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
