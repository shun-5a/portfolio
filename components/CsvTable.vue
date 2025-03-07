<template>
  <div>
    <table>
      <tbody>
        <tr
          v-for="row in csv"
        >
          <td
            v-for="cell in row"
            class="cell"
            v-html="cell"
          />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import Papa from 'papaparse';

const csv: Ref<Array<Array<string>>> = ref([]);

interface Props {
  filePath: string;
}
const props = withDefaults(defineProps<Props>(), {
  filePath: '',
});

onMounted(() => {
  fetch(props.filePath)
    .then(response => response.text())
    .then((text) => {
      Papa.parse(text, {
        quoteChar: '\'',
        skipEmptyLines: true,
        complete: function (data) {
          csv.value = data.data as Array<Array<string>>;
        },
      });
    });
});
</script>

<style scoped>
.cell {
  text-align: left;
  padding: 0 0.5rem 1rem 0;
}

.cell >>> a {
  text-decoration: none;
  color: #FFFFFF;
  opacity: 1;
}

.cell >>> a:hover {
  opacity: 0.5;
}
</style>
