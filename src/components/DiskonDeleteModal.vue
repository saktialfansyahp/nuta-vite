<template>
  <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div class="bg-white rounded-3xl px-8 py-6 w-full max-w-md shadow-xl">
      <h3 class="text-lg font-semibold text-gray-900 mb-3">Hapus Diskon</h3>

      <p v-if="!isBulk" class="text-sm text-gray-700 mb-2">
        Apakah Anda yakin ingin menghapus diskon
        <span class="font-semibold">“{{ namaDiskon }}”</span>?
      </p>

      <div v-else class="text-sm text-gray-700 mb-2">
        <p>
          Apakah Anda yakin ingin menghapus
          <span class="font-semibold">{{ total }}</span> diskon berikut?
        </p>

        <ul class="list-disc list-inside mt-2 max-h-28 overflow-y-auto">
          <li v-for="item in previewDiskons" :key="item">
            {{ item }}
          </li>
          <li v-if="extraCount > 0" class="italic text-gray-500">dan {{ extraCount }} lainnya…</li>
        </ul>
      </div>

      <ul class="text-sm text-gray-700 list-disc list-inside mb-6">
        <p>Diskon yang dihapus tidak bisa dikembalikan lagi.</p>
      </ul>

      <div class="flex justify-end gap-3">
        <button
          type="button"
          @click="$emit('cancel')"
          class="px-5 py-2.5 cursor-pointer rounded-full text-sm font-medium text-red-500 border border-red-400 hover:bg-red-50 transition-colors"
        >
          Batalkan
        </button>

        <button
          type="button"
          @click="$emit('confirm')"
          class="px-5 py-2.5 cursor-pointer rounded-full text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
        >
          Hapus
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeleteDiskonModal',
  props: {
    // single
    namaDiskon: String,

    // bulk
    isBulk: {
      type: Boolean,
      default: false,
    },
    diskonNames: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['confirm', 'cancel'],
  computed: {
    total() {
      return this.diskonNames.length
    },
    previewDiskons() {
      return this.diskonNames.slice(0, 3)
    },
    extraCount() {
      return this.diskonNames.length - this.previewDiskons.length
    },
  },
}
</script>
