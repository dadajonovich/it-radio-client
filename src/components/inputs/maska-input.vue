<template>
  <input
    v-maska
    class="input"
    :data-maska="context.maska?.mask"
    :data-maska-tokens="context.maska?.tokens"
    :value="context._value"
    :disabled="disabled"
    :readonly="readonly"
    type="text"
    :placeholder="placeholder"
    @maska="handleMaska"
  />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  props: {
    context: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const maska = computed(() => props.context.maska);
    const placeholder = computed(() => props.context.placeholder || '');
    const disabled = computed(() => props.context.disabled || false);
    const readonly = computed(() => props.context.readonly || false);

    function handleMaska($event: any) {
      props.context.node.input($event.target.value);
    }

    return {
      maska,
      placeholder,
      disabled,
      readonly,
      handleMaska,
    };
  },
});
</script>
