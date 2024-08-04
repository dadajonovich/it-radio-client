<template>
  <input
    v-maska
    class="input"
    :data-maska="props.context.maska?.mask"
    :data-maska-tokens="props.context.maska?.tokens"
    :value="props.context._value"
    :disabled="disabled"
    :readonly="readonly"
    type="text"
    :placeholder="placeholder"
    @maska="handleMaska"
  />
</template>

<script setup>
import { defineProps, ref, onUpdated, computed } from 'vue';
const props = defineProps({
  context: {
    type: Object,
    default: () => {},
  },
});

const maska = props.context.maska;
const placeholder = props.context.placeholder || '';
const disabled = props.context.disabled || false;
const readonly = props.context.readonly || false;
//const required = props.context.validatin === 'required' && 'required';

function handleMaska($event) {
  //console.log('handleInput', $event.target.disabled)
  props.context.node.input($event.target.value);
}
</script>
