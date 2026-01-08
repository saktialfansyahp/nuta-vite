<template>
  <div class="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-white">
    <!-- Items per page -->
    <div class="flex items-center gap-2">
      <select
        :value="itemsPerPage"
        @change="$emit('update-items-per-page', parseInt($event.target.value))"
        class="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      <span class="text-sm text-gray-600">data per halaman</span>
    </div>

    <!-- Pagination controls -->
    <div class="flex items-center gap-2">
      <!-- Previous button -->
      <button
        @click="$emit('change-page', currentPage - 1)"
        :disabled="currentPage === 1"
        :class="[
          'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
          currentPage === 1
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 hover:bg-gray-100',
        ]"
      >
        ‹
      </button>

      <!-- Page numbers -->
      <template v-for="page in visiblePages" :key="page">
        <button
          v-if="page !== '...'"
          @click="$emit('change-page', page)"
          :class="[
            'min-w-[36px] px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
            currentPage === page ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-gray-100',
          ]"
        >
          {{ page }}
        </button>
        <span v-else class="px-2 text-gray-500">...</span>
      </template>

      <!-- Next button -->
      <button
        @click="$emit('change-page', currentPage + 1)"
        :disabled="currentPage === totalPages"
        :class="[
          'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
          currentPage === totalPages
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 hover:bg-gray-100',
        ]"
      >
        ›
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      default: 10,
    },
  },
  emits: ['change-page', 'update-items-per-page'],
  computed: {
    visiblePages() {
      const pages = []
      const total = this.totalPages
      const current = this.currentPage

      if (total <= 7) {
        // Show all pages if 7 or fewer
        for (let i = 1; i <= total; i++) {
          pages.push(i)
        }
      } else {
        // Always show first page
        pages.push(1)

        if (current > 3) {
          pages.push('...')
        }

        // Show pages around current
        const start = Math.max(2, current - 1)
        const end = Math.min(total - 1, current + 1)

        for (let i = start; i <= end; i++) {
          pages.push(i)
        }

        if (current < total - 2) {
          pages.push('...')
        }

        // Always show last page
        pages.push(total)
      }

      return pages
    },
  },
}
</script>
