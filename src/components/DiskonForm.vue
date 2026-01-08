<script setup>
import { ref, watch } from 'vue'
import { api } from '../api/diskon'

const props = defineProps({ data: Object })
const emit = defineEmits(['close', 'saved'])

const name = ref('')
const value = ref('')
const type = ref('percent')
const error = ref('')

watch(
  () => props.data,
  (d) => {
    if (d) {
      name.value = d.name
      value.value = d.value
      type.value = d.type
    }
  },
)

const save = async () => {
  if (!name.value || !value.value) {
    error.value = 'Semua field wajib diisi'
    return
  }

  const payload = {
    name: name.value,
    value: Number(value.value),
    type: type.value,
  }

  if (props.data?._id) {
    await api.put('/' + props.data._id, payload)
  } else {
    await api.post('/', payload)
  }

  emit('saved')
  emit('close')
}
</script>

<template>
  <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div class="bg-white w-[420px] rounded-xl p-6">
      <h2 class="text-lg font-semibold mb-4">
        {{ props.data ? 'Ubah Diskon' : 'Tambah Diskon' }}
      </h2>

      <input
        v-model="name"
        placeholder="Nama Diskon"
        class="w-full border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary"
      />

      <input
        v-model="value"
        type="number"
        class="w-full border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary"
      />

      <div class="flex gap-2 mb-3">
        <button
          class="flex-1 py-2 rounded-xl text-sm font-medium"
          :class="type === 'percent' ? 'bg-primary text-white' : 'border'"
          @click="type = 'percent'"
        >
          %
        </button>
        <button
          class="flex-1 py-2 rounded-xl text-sm font-medium"
          :class="type === 'percent' ? 'bg-primary text-white' : 'border'"
          @click="type = 'rupiah'"
        >
          Rp
        </button>
      </div>

      <p v-if="error" class="text-danger text-sm mb-2">{{ error }}</p>

      <div class="flex justify-end gap-2">
        <button @click="$emit('close')">Batal</button>
        <button class="bg-primary text-white px-4 py-2 rounded-xl" @click="save">Simpan</button>
      </div>
    </div>
  </div>
</template>
