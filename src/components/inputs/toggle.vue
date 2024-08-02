<template>
  <input
    class="input field__checkbox-input"
    :id="context.id"
    :checked="context._value"
    :disabled="disabled"
    :readonly="readonly"
    type="checkbox"
    @change="change"
  />
  <label class="field__checkbox-label" :for="context.id">
    {{ context.label }}
  </label>
</template>

<script lang="ts">
import { defineProps, ref, onUpdated, computed } from 'vue';

export default {
  name: 'toggle',
  props: {
    context: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      placeholder: this.context.placeholder || '',
      disabled: this.context.disabled || false,
      readonly: this.context.readonly || false,
    };
  },
  methods: {
    change() {
      this.context.node.input(!this.context._value);
    },
  },
};
</script>
