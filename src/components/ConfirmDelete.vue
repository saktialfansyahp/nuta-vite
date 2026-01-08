<script setup>
defineProps({ data: Object })
defineEmits(['confirm', 'cancel'])
</script>

<template>
  <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div class="bg-white rounded-2xl p-6 w-[420px] shadow-xl">
      <h3 class="font-semibold mb-3">Hapus Diskon</h3>
      <p class="text-sm mb-4">
        Yakin ingin menghapus diskon <b>{{ data.name }}</b
        >?
      </p>

      <div class="flex justify-end gap-2">
        <button @click="$emit('cancel')">Batalkan</button>
        <button class="bg-danger text-white px-4 py-2 rounded-xl" @click="$emit('confirm')">
          Hapus
        </button>
      </div>
    </div>
  </div>
</template>
