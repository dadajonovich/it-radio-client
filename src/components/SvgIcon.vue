<template>
  <span v-html="src" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SvgIcon',
  props: {
    src: {
      type: String,
      required: true,
    },
  },
});
</script>
