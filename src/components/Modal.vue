<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex min-h-screen items-center justify-center p-4">
          <div class="fixed inset-0 bg-black/50 transition-opacity" @click="$emit('close')"></div>

          <div class="relative bg-surface rounded-md3-xl shadow-md3-2 max-w-md w-full p-6 z-10">
            <h2 v-if="title" class="text-xl font-semibold mb-4">{{ title }}</h2>

            <div class="mb-6">
              <slot></slot>
            </div>

            <div class="flex justify-end gap-2">
              <BaseButton variant="text" @click="$emit('close')">
                {{ cancelText }}
              </BaseButton>
              <BaseButton variant="filled" @click="$emit('confirm')">
                {{ confirmText }}
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import BaseButton from './BaseButton.vue'

defineProps({
  show: Boolean,
  title: String,
  cancelText: {
    type: String,
    default: 'Batal',
  },
  confirmText: {
    type: String,
    default: 'Konfirmasi',
  },
})

defineEmits(['close', 'confirm'])
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
