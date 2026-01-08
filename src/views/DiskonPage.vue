<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200 px-6 py-8">
      <div class="flex w-full flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div class="flex flex-col space-y-4 w-full lg:w-auto">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Daftar Diskon</h1>
          <p v-if="diskons.length > 0" class="text-sm text-gray-600">
            Total jumlah diskon: {{ diskons.length }}
          </p>
          <div class="flex flex-col gap-3 sm:flex-row sm:space-x-4 sm:gap-0">
            <div v-if="diskons.length > 0" class="relative w-full sm:flex-1">
              <svg
                class="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Cari diskon"
                class="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-4xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <div class="relative">
                <!-- Trigger -->
                <button
                  @click="showApiInput = !showApiInput"
                  class="flex cursor-pointer items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg"
                >
                  <svg class="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none">
                    <path d="M3 3h7l2 4h9l-3.5 7" stroke="currentColor" stroke-width="2" />
                  </svg>
                  <span class="font-medium">Kopi Anak Bangsa</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M19 9l-7 7-7-7" stroke-width="2" />
                  </svg>
                </button>

                <!-- Dropdown Content -->
                <div
                  v-if="showApiInput"
                  class="absolute mt-2 w-[420px] bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-20"
                >
                  <label class="block text-sm text-gray-600 mb-1"> API URL crudcrud.com </label>

                  <input
                    v-model="tempApiUrl"
                    type="text"
                    placeholder="https://crudcrud.com/api/xxxx/diskon"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />

                  <button
                    @click="applyApiUrl"
                    class="mt-4 px-5 py-2 bg-green-600 text-white rounded-full hover:bg-green-700"
                  >
                    Terapkan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full lg:w-auto">
          <!-- Add Button -->
          <button
            v-if="diskons.length > 0 && !showBulkDelete"
            @click="openModal"
            class="w-full lg:w-auto cursor-pointer flex items-center justify-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-4xl transition-colors shadow-sm whitespace-nowrap"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Tambah diskon
          </button>
          <div class="flex row space-x-3">
            <button
              v-if="showBulkDelete && selectedIds.length > 0"
              @click="cancelSelectAll"
              class="w-full cursor-pointer lg:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-red-600 border border-red-500 bg-white hover:bg-red-50 font-small rounded-4xl transition-colors whitespace-nowrap"
            >
              Batalkan
            </button>

            <button
              v-if="showBulkDelete && selectedIds.length > 0"
              @click="openBulkDeleteModal"
              class="w-full cursor-pointer lg:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-small rounded-4xl transition-colors whitespace-nowrap"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showSuccessAlert" class="fixed top-[25px] left-1/2 -translate-x-1/2 z-50">
      <div
        class="bg-teal-700 text-white px-4 py-4 rounded-lg shadow-lg flex items-center gap-4 min-w-[400px]"
      >
        <span class="text-sm font-medium">
          {{ successMessage }}
        </span>

        <button @click="showSuccessAlert = false" class="ml-auto hover:text-gray-200">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>

    <DiskonDeleteModal
      v-if="showDeleteModal"
      :nama-diskon="formData.namaDiskon"
      :is-bulk="isBulkDelete"
      :diskon-names="
        isBulkDelete
          ? diskons.filter((d) => selectedIds.includes(d.id)).map((d) => d.namaDiskon)
          : []
      "
      @confirm="isBulkDelete ? bulkDeleteDiskon() : hapusDiskon()"
      @cancel="closeDeleteModal"
    />

    <!-- Main Content -->
    <div class="flex-1 px-6 py-6">
      <div class="w-full px-8 mx-auto">
        <!-- Diskon List atau Empty State -->
        <DiskonList
          v-if="diskons.length > 0"
          :diskons="filteredDiskons"
          :selectedIds="selectedIds"
          :selectAll="selectAll"
          @toggle-select-all="toggleSelectAll"
          @update-selected="selectedIds = $event"
          @sort="sortBy"
          @edit="editDiskon"
          @on-check="tesCheck"
        />

        <DiskonEmpty v-else @add-diskon="openModal" />
      </div>
    </div>

    <!-- Footer -->
    <div class="px-6 py-6 text-left text-sm text-gray-600 border-t border-gray-200">
      2024 © <span class="font-medium">PT Nusantara Berkah Digital</span>
    </div>

    <!-- Modal Tambah/Edit Diskon -->
    <DiskonModal
      v-if="showModal"
      :isEditMode="isEditMode"
      :formData="formData"
      :errors="errors"
      :touched="touched"
      :isSubmitting="isSubmitting"
      :isFocusedNamaDiskon="isFocusedNamaDiskon"
      :isFocusedNilaiDiskon="isFocusedNilaiDiskon"
      @delete="openDeleteModal"
      @close="closeModal"
      @submit="simpanDiskon"
      @update:formData="formData = $event"
      @focus-nama="onFocusNamaDiskon"
      @blur-nama="onBlurNamaDiskon"
      @input-nama="onInputNamaDiskon"
      @focus-nilai="onFocusNilaiDiskon"
      @blur-nilai="onBlurNilaiDiskon"
      @input-nilai="onInputNilaiDiskon"
      @change-tipe="changeTipeDiskon"
    />
  </div>
</template>

<script>
// Import komponen child
import DiskonList from '@/components/DiskonList.vue'
import DiskonEmpty from '@/components/DiskonEmpty.vue'
import DiskonModal from '@/components/DiskonModal.vue'
import DiskonDeleteModal from '@/components/DiskonDeleteModal.vue'

export default {
  name: 'DiskonPage',
  components: {
    DiskonList,
    DiskonEmpty,
    DiskonModal,
    DiskonDeleteModal,
  },
  data() {
    return {
      apiUrl: '',
      tempApiUrl: '',
      showApiInput: false,
      selectedCategory: 'Kopi Anak Bangsa',
      showModal: false,
      isEditMode: false,
      isSubmitting: false,
      isFocusedNamaDiskon: false,
      isFocusedNilaiDiskon: false,
      searchQuery: '',
      selectedIds: [],
      showSuccessAlert: false,
      successMessage: 'tes',
      sortColumn: null,
      sortDirection: 'asc',
      isBulkDelete: false,
      diskons: [
        // Uncomment untuk testing dengan data
        {
          id: 1,
          namaDiskon: 'Burger Hemat',
          nilaiDiskon: 10000,
          tipeDiskon: 'rupiah',
          isBaru: true,
        },
        {
          id: 2,
          namaDiskon: 'Cheese Lover Promo',
          nilaiDiskon: 8000,
          tipeDiskon: 'rupiah',
          isBaru: false,
        },
        {
          id: 3,
          namaDiskon: 'Combo Mantul!',
          nilaiDiskon: 25,
          tipeDiskon: 'persen',
          isBaru: false,
        },
      ],
      formData: {
        namaDiskon: '',
        nilaiDiskon: '',
        tipeDiskon: 'persen',
      },
      errors: {
        namaDiskon: '',
        nilaiDiskon: '',
      },
      touched: {
        namaDiskon: false,
        nilaiDiskon: false,
      },
      showDeleteModal: false,
      editingId: null,
      deletingId: null,
      showBulkDelete: false,
    }
  },
  computed: {
    filteredDiskons() {
      let result = this.diskons

      if (this.searchQuery) {
        result = result.filter((d) =>
          d.namaDiskon.toLowerCase().includes(this.searchQuery.toLowerCase()),
        )
      }

      if (this.sortColumn) {
        result = [...result].sort((a, b) => {
          let aVal = a[this.sortColumn]
          let bVal = b[this.sortColumn]

          if (this.sortColumn === 'namaDiskon') {
            aVal = aVal.toLowerCase()
            bVal = bVal.toLowerCase()
          }

          if (aVal < bVal) return this.sortDirection === 'asc' ? -1 : 1
          if (aVal > bVal) return this.sortDirection === 'asc' ? 1 : -1
          return 0
        })
      }

      return result
    },
    selectAll() {
      return (
        this.filteredDiskons.length > 0 && this.selectedIds.length === this.filteredDiskons.length
      )
    },
  },
  methods: {
    tesCheck() {
      if (this.selectedIds <= 0) {
        this.showBulkDelete = false
      } else {
        this.showBulkDelete = true
      }
    },
    applyApiUrl() {
      if (!this.tempApiUrl) return

      this.apiUrl = this.tempApiUrl
      this.showApiInput = false

      // fetch ulang data diskon
      this.fetchDiskon()
    },

    async fetchDiskon() {
      if (!this.apiUrl) return

      const res = await fetch(this.apiUrl)
      const data = await res.json()
      this.diskons = data
    },
    cancelSelectAll() {
      this.showBulkDelete = false
      this.selectedIds = []
    },
    toggleSelectAll() {
      if (this.selectAll) {
        // Jika sudah semua terselect, unselect semua
        this.showBulkDelete = false
        this.selectedIds = []
      } else {
        // Jika belum semua terselect, select semua filtered diskons
        this.selectedIds = this.filteredDiskons.map((d) => d.id)
        this.tesCheck()
      }
    },
    sortBy(column) {
      if (this.sortColumn === column) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
      } else {
        this.sortColumn = column
        this.sortDirection = 'asc'
      }
    },
    openModal() {
      this.isEditMode = false
      this.showModal = true
    },
    editDiskon(diskon) {
      this.isEditMode = true
      this.editingId = diskon.id
      this.formData = {
        namaDiskon: diskon.namaDiskon,
        nilaiDiskon: diskon.nilaiDiskon,
        tipeDiskon: diskon.tipeDiskon,
      }
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
      setTimeout(() => {
        this.resetForm()
      }, 300)
    },
    openDeleteModal(diskon) {
      this.showModal = false
      this.deletingDiskon = diskon
      this.showDeleteModal = true
    },
    closeDeleteModal() {
      this.resetForm()
      this.showDeleteModal = false
    },
    openBulkDeleteModal() {
      if (this.selectedIds.length === 0) return

      this.isBulkDelete = true
      this.showDeleteModal = true
    },
    onFocusNamaDiskon() {
      this.isFocusedNamaDiskon = true
    },
    onBlurNamaDiskon() {
      this.isFocusedNamaDiskon = false
      this.touched.namaDiskon = true
      this.validateNamaDiskon()
    },
    onInputNamaDiskon() {
      if (this.touched.namaDiskon) {
        this.validateNamaDiskon()
      }
    },
    onFocusNilaiDiskon() {
      this.isFocusedNilaiDiskon = true
    },
    onBlurNilaiDiskon() {
      this.isFocusedNilaiDiskon = false
      this.touched.nilaiDiskon = true
      this.validateNilaiDiskon()
    },
    onInputNilaiDiskon() {
      if (this.touched.nilaiDiskon) {
        this.validateNilaiDiskon()
      }
    },
    changeTipeDiskon(tipe) {
      this.formData.tipeDiskon = tipe
      if (this.touched.nilaiDiskon && this.formData.nilaiDiskon) {
        this.validateNilaiDiskon()
      }
    },
    validateNamaDiskon() {
      const isDuplicate = this.diskons.some((d) => {
        // saat edit → skip data yang sedang diedit
        if (this.isEditMode && d.id === this.editingId) {
          return false
        }

        return d.namaDiskon.trim().toLowerCase() === this.formData.namaDiskon.toLowerCase()
      })

      if (!this.formData.namaDiskon.trim()) {
        this.errors.namaDiskon = 'Nama diskon tidak boleh kosong.'
        return false
      } else if (this.formData.namaDiskon.trim().length < 3) {
        this.errors.namaDiskon = 'Nama diskon minimal 3 karakter.'
        return false
      } else if (this.formData.namaDiskon.trim().length > 100) {
        this.errors.namaDiskon = 'Nama diskon maksimal 100 karakter.'
        return false
      } else if (isDuplicate) {
        this.errors.namaDiskon = 'Nama diskon tidak boleh sama.'
        return false
      } else {
        this.errors.namaDiskon = ''
        return true
      }
    },
    validateNilaiDiskon() {
      const nilai = this.formData.nilaiDiskon

      if (nilai === '' || nilai === null) {
        this.errors.nilaiDiskon = 'Nilai diskon tidak boleh kosong.'
        return false
      }

      const numNilai = Number(nilai)

      if (isNaN(numNilai)) {
        this.errors.nilaiDiskon = 'Nilai diskon harus berupa angka.'
        return false
      }

      if (numNilai <= 0) {
        this.errors.nilaiDiskon = 'Nilai diskon harus lebih dari 0.'
        return false
      }

      if (this.formData.tipeDiskon === 'persen' && numNilai > 100) {
        this.errors.nilaiDiskon = 'Persentase diskon maksimal 100%.'
        return false
      }

      if (this.formData.tipeDiskon === 'rupiah' && numNilai > 99999999) {
        this.errors.nilaiDiskon = 'Nilai diskon terlalu besar.'
        return false
      }

      this.errors.nilaiDiskon = ''
      return true
    },
    async simpanDiskon() {
      this.touched.namaDiskon = true
      this.touched.nilaiDiskon = true

      const isNamaValid = this.validateNamaDiskon()
      const isNilaiValid = this.validateNilaiDiskon()

      if (!isNamaValid || !isNilaiValid) {
        return
      }

      this.isSubmitting = true

      try {
        await new Promise((resolve) => setTimeout(resolve, 800))

        if (this.isEditMode) {
          const index = this.diskons.findIndex((d) => d.id === this.editingId)
          if (index !== -1) {
            this.diskons[index] = {
              ...this.diskons[index],
              namaDiskon: this.formData.namaDiskon,
              nilaiDiskon: Number(this.formData.nilaiDiskon),
              tipeDiskon: this.formData.tipeDiskon,
            }
          }
          this.successMessage = 'Diskon berhasil diperbarui.'
        } else {
          const newDiskon = {
            id: Date.now(),
            namaDiskon: this.formData.namaDiskon,
            nilaiDiskon: Number(this.formData.nilaiDiskon),
            tipeDiskon: this.formData.tipeDiskon,
            isBaru: true,
          }
          this.diskons.unshift(newDiskon)
          this.successMessage = `${this.formData.namaDiskon} berhasil ditambahkan.`
        }

        this.showModal = false
        this.showSuccessAlert = true
        this.resetForm()

        setTimeout(() => {
          this.showSuccessAlert = false
        }, 5000)
      } catch (error) {
        console.error('Error saving diskon:', error)
        alert('Terjadi kesalahan saat menyimpan diskon')
      } finally {
        this.isSubmitting = false
      }
    },

    async hapusDiskon() {
      if (!this.editingId) return

      this.isSubmitting = true

      try {
        // simulasi API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        const deletedDiskon = this.diskons.find((d) => d.id === this.editingId)

        this.diskons = this.diskons.filter((d) => d.id !== this.editingId)

        this.successMessage = deletedDiskon
          ? `${deletedDiskon.namaDiskon} berhasil dihapus.`
          : 'Diskon berhasil dihapus.'

        this.showDeleteConfirm = false
        this.showModal = false
        this.showDeleteModal = false
        this.showSuccessAlert = true

        setTimeout(() => {
          this.showSuccessAlert = false
        }, 5000)
      } catch (error) {
        console.error('Error deleting diskon:', error)
        alert('Terjadi kesalahan saat menghapus diskon')
      } finally {
        this.resetForm()
        this.isSubmitting = false
        this.deletingId = null
      }
    },

    async bulkDeleteDiskon() {
      if (this.selectedIds.length === 0) return

      this.isSubmitting = true

      try {
        await new Promise((resolve) => setTimeout(resolve, 600))

        const deletedNames = this.diskons
          .filter((d) => this.selectedIds.includes(d.id))
          .map((d) => d.namaDiskon)

        this.diskons = this.diskons.filter((d) => !this.selectedIds.includes(d.id))

        this.successMessage = `${deletedNames.length} diskon berhasil dihapus.`
        this.showSuccessAlert = true

        this.selectedIds = []
        this.showDeleteModal = false
        this.showDeleteConfirm = false
        this.showBulkDelete = false

        setTimeout(() => {
          this.showSuccessAlert = false
        }, 5000)
      } catch (e) {
        alert('Gagal menghapus diskon')
      } finally {
        this.isSubmitting = false
        this.deletingId = null
      }
    },
    resetForm() {
      this.formData = {
        namaDiskon: '',
        nilaiDiskon: '',
        tipeDiskon: 'persen',
      }
      this.errors = {
        namaDiskon: '',
        nilaiDiskon: '',
      }
      this.touched = {
        namaDiskon: false,
        nilaiDiskon: false,
      }
      this.isFocusedNamaDiskon = false
      this.isFocusedNilaiDiskon = false
      this.editingId = null
      this.deletingId = null
      this.isEditMode = false
    },
  },
}
</script>

<style scoped>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}
</style>
