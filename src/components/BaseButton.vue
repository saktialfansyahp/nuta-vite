<template>
  <button :class="buttonClasses" :disabled="disabled" @click="$emit('click', $event)">
    <i v-if="icon" :class="`mdi mdi-${icon} mr-2`"></i>
    <slot></slot>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'filled',
    validator: (value) => ['filled', 'outlined', 'text', 'tonal'].includes(value),
  },
  icon: String,
  disabled: Boolean,
})

const buttonClasses = computed(() => {
  const base =
    'px-6 py-2.5 rounded-full font-medium text-sm transition-all flex items-center justify-center min-h-[40px]'

  const variants = {
    filled: 'bg-primary text-white hover:shadow-md3-1 disabled:bg-gray-300',
    outlined:
      'border-2 border-primary text-primary hover:bg-primary/5 disabled:border-gray-300 disabled:text-gray-400',
    text: 'text-primary hover:bg-primary/5 disabled:text-gray-400',
    tonal: 'bg-primary-container text-primary-on-container hover:shadow-md3-1 disabled:bg-gray-200',
  }

  return `${base} ${variants[props.variant]}`
})

defineEmits(['click'])
</script>
