<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
    <table class="w-full">
      <thead class="bg-gray-50 border-b border-gray-200">
        <tr>
          <th class="w-12 px-6 py-3">
            <input
              type="checkbox"
              :checked="selectAll"
              @change="$emit('toggle-select-all', !selectAll)"
              class="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            <button
              @click="$emit('sort', 'namaDiskon')"
              class="flex items-center gap-1 hover:text-gray-700"
            >
              Nama Diskon
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                />
              </svg>
            </button>
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            <button
              @click="$emit('sort', 'nilaiDiskon')"
              class="flex items-center gap-1 hover:text-gray-700"
            >
              Nilai Diskon
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                />
              </svg>
            </button>
          </th>
          <th class="w-20 px-6 py-3"></th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="diskon in diskons" :key="diskon.id" class="hover:bg-gray-50 transition-colors">
          <td class="px-6 py-4">
            <input
              type="checkbox"
              :checked="selectedIds.includes(diskon.id)"
              @change="toggleSelection(diskon.id)"
              class="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
          </td>
          <td class="px-6 py-4">
            <div class="flex items-center gap-2">
              <span class="text-sm font-medium text-gray-900">{{ diskon.namaDiskon }}</span>
              <span
                v-if="diskon.isBaru"
                class="px-2 py-0.5 text-xs font-medium text-blue-700 bg-blue-50 rounded"
                >baru</span
              >
            </div>
          </td>
          <td class="px-6 py-4 text-sm text-gray-900">
            {{ formatDiskon(diskon) }}
          </td>
          <td class="px-6 py-4 text-right">
            <button
              @click="$emit('edit', diskon)"
              class="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
          </td>
        </tr>

        <tr v-if="diskons.length === 0">
          <td colspan="4" class="px-6 py-16 text-center">
            <div class="flex flex-col items-center justify-center">
              <svg
                class="w-16 h-16 text-gray-300 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <p class="text-gray-500 font-medium mb-1">Tidak ada diskon ditemukan</p>
              <p class="text-gray-400 text-sm">Coba ubah filter atau kata kunci pencarian</p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'DiskonList',
  props: {
    diskons: {
      type: Array,
      required: true,
    },
    selectedIds: {
      type: Array,
      required: true,
    },
    selectAll: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['toggle-select-all', 'update-selected', 'sort', 'edit', 'on-check'],
  methods: {
    formatDiskon(diskon) {
      if (diskon.tipeDiskon === 'persen') {
        return `${diskon.nilaiDiskon}%`
      } else {
        return `Rp ${diskon.nilaiDiskon.toLocaleString('id-ID')}`
      }
    },
    toggleSelection(id) {
      const newSelected = [...this.selectedIds]
      const index = newSelected.indexOf(id)
      if (index > -1) {
        newSelected.splice(index, 1)
      } else {
        newSelected.push(id)
      }
      this.$emit('update-selected', newSelected)
      this.$emit('on-check')
    },
  },
}
</script>
