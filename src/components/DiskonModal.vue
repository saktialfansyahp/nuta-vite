<template>
  <div
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    @click.self="$emit('close')"
  >
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
      <div class="flex items-center justify-between px-8 py-6 border-b border-gray-200">
        <h2 class="text-2xl font-bold text-gray-900">
          {{ isEditMode ? 'Edit Diskon' : 'Tambah Diskon' }}
        </h2>
        <button
          @click="$emit('close')"
          class="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div class="px-8 py-6 space-y-6">
        <div class="space-y-2">
          <div class="relative">
            <input
              :value="formData.namaDiskon"
              @input="updateNamaDiskon"
              @blur="$emit('blur-nama')"
              @focus="$emit('focus-nama')"
              type="text"
              id="nama_diskon"
              placeholder="Misal: Diskon opening, diskon akhir tahun"
              class="peer block w-full px-4 pb-3 pt-4 text-sm bg-transparent rounded-lg appearance-none outline-none transition-all border focus:ring-0"
              :class="[
                touched.namaDiskon && errors.namaDiskon
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:border-green-600',
                touched.namaDiskon && errors.namaDiskon ? 'pr-11' : '',
              ]"
            />

            <label
              for="nama_diskon"
              class="absolute text-sm duration-300 transform origin-[0] bg-white px-2 pointer-events-none -translate-y-4 scale-75 top-2 start-3"
              :class="[
                touched.namaDiskon && errors.namaDiskon
                  ? 'text-red-500'
                  : isFocusedNamaDiskon
                    ? 'text-green-600'
                    : 'text-gray-500',
              ]"
            >
              Nama Diskon
            </label>

            <div
              v-if="touched.namaDiskon && errors.namaDiskon"
              class="absolute inset-y-0 right-4 flex items-center pointer-events-none"
            >
              <svg class="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>

          <p
            v-if="touched.namaDiskon && errors.namaDiskon"
            class="text-sm text-red-500 flex items-start gap-1"
          >
            <svg class="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            {{ errors.namaDiskon }}
          </p>
        </div>

        <div class="flex gap-4">
          <div class="flex-1 space-y-2">
            <div class="relative">
              <input
                :value="formData.nilaiDiskon"
                @input="updateNilaiDiskon"
                @blur="$emit('blur-nilai')"
                @focus="$emit('focus-nilai')"
                type="number"
                id="nilai_diskon"
                placeholder="0"
                min="0"
                step="0.01"
                class="peer block w-full pb-3 pt-4 text-sm bg-transparent rounded-lg appearance-none outline-none transition-all border focus:ring-0"
                :class="[
                  // padding dinamis
                  formData.tipeDiskon === 'rupiah' ? 'pl-12 pr-4' : 'pl-4 pr-12',

                  // error / normal border
                  touched.nilaiDiskon && errors.nilaiDiskon
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:border-green-600',
                ]"
              />

              <label
                for="nilai_diskon"
                class="absolute text-sm duration-300 transform origin-[0] bg-white px-2 pointer-events-none -translate-y-4 scale-75 top-2 start-3"
                :class="[
                  touched.nilaiDiskon && errors.nilaiDiskon
                    ? 'text-red-500'
                    : isFocusedNilaiDiskon
                      ? 'text-green-600'
                      : 'text-gray-500',
                ]"
              >
                Diskon
              </label>

              <span
                v-if="formData.tipeDiskon === 'rupiah'"
                class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none"
              >
                Rp
              </span>

              <span
                v-else
                class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none"
              >
                %
              </span>
            </div>

            <p
              v-if="touched.nilaiDiskon && errors.nilaiDiskon"
              class="text-sm text-red-500 flex items-start gap-1"
            >
              <svg class="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
              {{ errors.nilaiDiskon }}
            </p>
          </div>

          <div class="flex items-start">
            <div class="inline-flex rounded-lg border border-gray-300 overflow-hidden h-fit">
              <button
                @click="$emit('change-tipe', 'persen')"
                type="button"
                :class="[
                  'px-6 py-3 font-medium cursor-pointer transition-colors',
                  formData.tipeDiskon === 'persen'
                    ? 'bg-green-50 text-green-600'
                    : 'bg-white text-gray-600 hover:bg-gray-50',
                ]"
              >
                <span class="flex items-center gap-2">
                  <svg
                    v-if="formData.tipeDiskon === 'persen'"
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  %
                </span>
              </button>

              <button
                @click="$emit('change-tipe', 'rupiah')"
                type="button"
                :class="[
                  'px-6 py-3 font-medium cursor-pointer transition-colors border-l border-gray-300',
                  formData.tipeDiskon === 'rupiah'
                    ? 'bg-green-50 text-green-600'
                    : 'bg-white text-gray-600 hover:bg-gray-50',
                ]"
              >
                <span class="flex items-center gap-2">
                  <svg
                    v-if="formData.tipeDiskon === 'rupiah'"
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Rp
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        class="flex items-center gap-3 px-8 py-6 bg-gray-50 rounded-b-2xl border-t border-gray-200"
        :class="isEditMode ? 'justify-between' : 'justify-center'"
      >
        <button
          v-if="isEditMode"
          type="button"
          @click="$emit('delete')"
          class="text-red-600 cursor-pointer text-sm font-medium hover:underline hover:text-red-700"
        >
          Hapus
        </button>
        <button
          type="button"
          @click="$emit('submit')"
          :disabled="isSubmitting"
          class="py-3 cursor-pointer text-sm font-medium justify-center text-white bg-green-600 rounded-4xl hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          :class="isEditMode ? 'w-1/5' : 'w-full px-6'"
        >
          <svg v-if="isSubmitting" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {{ isSubmitting ? 'Menyimpan...' : isEditMode ? 'Simpan' : 'Tambah Diskon' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DiskonModal',
  props: {
    isEditMode: {
      type: Boolean,
      default: false,
    },
    formData: {
      type: Object,
      required: true,
    },
    errors: {
      type: Object,
      required: true,
    },
    touched: {
      type: Object,
      required: true,
    },
    isSubmitting: {
      type: Boolean,
      default: false,
    },
    isFocusedNamaDiskon: {
      type: Boolean,
      default: false,
    },
    isFocusedNilaiDiskon: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    updateNamaDiskon(event) {
      this.$emit('update:formData', {
        ...this.formData,
        namaDiskon: event.target.value,
      })
      this.$emit('input-nama')
    },
    updateNilaiDiskon(event) {
      this.$emit('update:formData', {
        ...this.formData,
        nilaiDiskon: event.target.value,
      })
      this.$emit('input-nilai')
    },
  },
}
</script>
