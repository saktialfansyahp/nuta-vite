<template>
  <div :class="cardClasses">
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'elevated',
    validator: (value) => ['elevated', 'filled', 'outlined'].includes(value),
  },
})

const cardClasses = computed(() => {
  const base = 'rounded-md3-lg overflow-hidden'

  const variants = {
    elevated: 'bg-surface shadow-md3-1',
    filled: 'bg-surface-variant',
    outlined: 'bg-surface border border-outline',
  }

  return `${base} ${variants[props.variant]}`
})
</script>
