<template>
  <div class="w-full mb-4">
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
      <span v-if="required" class="text-error">*</span>
    </label>
    <div class="relative">
      <input
        v-if="type !== 'textarea'"
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :class="inputClasses"
      />
      <textarea
        v-else
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :rows="rows"
        :class="inputClasses"
      ></textarea>
      <i
        v-if="icon"
        :class="`mdi mdi-${icon} absolute right-3 top-1/2 -translate-y-1/2 text-gray-400`"
      ></i>
    </div>
    <p v-if="error" class="text-error text-xs mt-1">{{ error }}</p>
    <p v-else-if="hint" class="text-gray-500 text-xs mt-1">{{ hint }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: [String, Number],
  label: String,
  type: {
    type: String,
    default: 'text',
  },
  placeholder: String,
  disabled: Boolean,
  required: Boolean,
  error: String,
  hint: String,
  icon: String,
  rows: {
    type: Number,
    default: 4,
  },
})

const inputClasses = computed(() => {
  const base =
    'w-full px-4 py-3 border rounded-md3-sm focus:outline-none focus:ring-2 transition-all'
  const state = props.error
    ? 'border-error focus:ring-error/20'
    : 'border-outline focus:ring-primary/20 focus:border-primary'
  const disabled = props.disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'

  return `${base} ${state} ${disabled}`
})

defineEmits(['update:modelValue'])
</script>
