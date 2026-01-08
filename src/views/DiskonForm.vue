<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-3xl mx-auto">
      <!-- Header -->
      <div class="mb-6">
        <button @click="goBack" class="flex items-center text-primary hover:text-primary/80 mb-4">
          <i class="mdi mdi-arrow-left mr-2"></i>
          Kembali
        </button>
        <h1 class="text-2xl font-bold text-gray-900">
          {{ isEdit ? 'Edit Diskon' : 'Tambah Diskon Baru' }}
        </h1>
      </div>

      <!-- Form Card -->
      <BaseCard class="p-6">
        <form @submit.prevent="handleSubmit">
          <!-- Nama Diskon -->
          <TextField
            v-model="form.nama"
            label="Nama Diskon"
            placeholder="Contoh: Diskon Hari Raya"
            required
            :error="errors.nama"
          />

          <!-- Persentase -->
          <TextField
            v-model.number="form.persentase"
            label="Persentase Diskon"
            type="number"
            placeholder="0"
            required
            :error="errors.persentase"
            hint="Masukkan nilai antara 0-100"
          >
            <template #suffix>
              <span class="text-gray-500">%</span>
            </template>
          </TextField>

          <!-- Status -->
          <SelectField
            v-model="form.status"
            label="Status"
            placeholder="Pilih status"
            :options="statusOptions"
            required
            :error="errors.status"
          />

          <!-- Minimal Pembelian -->
          <TextField
            v-model.number="form.minimalPembelian"
            label="Minimal Pembelian"
            type="number"
            placeholder="0"
            required
            :error="errors.minimalPembelian"
            hint="Minimal pembelian dalam Rupiah"
          />

          <!-- Kuota -->
          <TextField
            v-model.number="form.kuota"
            label="Kuota"
            type="number"
            placeholder="0"
            required
            :error="errors.kuota"
            hint="Jumlah maksimal penggunaan diskon"
          />

          <!-- Berlaku Untuk -->
          <SelectField
            v-model="form.berlakuUntuk"
            label="Berlaku Untuk"
            placeholder="Pilih kategori"
            :options="berlakuUntukOptions"
            required
            :error="errors.berlakuUntuk"
          />

          <!-- Deskripsi -->
          <TextField
            v-model="form.deskripsi"
            label="Deskripsi"
            type="textarea"
            placeholder="Masukkan deskripsi diskon..."
            :rows="4"
            :error="errors.deskripsi"
            hint="Jelaskan detail dan ketentuan diskon"
          />

          <!-- Action Buttons -->
          <div class="flex justify-end gap-3 mt-6 pt-6 border-t">
            <BaseButton type="button" variant="outlined" @click="goBack"> Batal </BaseButton>
            <BaseButton type="submit" variant="filled" :disabled="loading" icon="content-save">
              {{ loading ? 'Menyimpan...' : isEdit ? 'Update' : 'Simpan' }}
            </BaseButton>
          </div>
        </form>
      </BaseCard>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import BaseCard from '@/components/BaseCard.vue'
import TextField from '@/components/TextField.vue'
import SelectField from '@/components/SelectField.vue'
import apiService from '@/api/services/api'

const router = useRouter()
const route = useRoute()

const loading = ref(false)
const isEdit = computed(() => !!route.params.id)

const form = ref({
  nama: '',
  persentase: 0,
  status: '',
  minimalPembelian: 0,
  kuota: 0,
  berlakuUntuk: '',
  deskripsi: '',
})

const errors = ref({})

const statusOptions = [
  { label: 'Aktif', value: 'Aktif' },
  { label: 'Tidak Aktif', value: 'Tidak Aktif' },
]

const berlakuUntukOptions = [
  { label: 'Semua Produk', value: 'Semua Produk' },
  { label: 'Minuman', value: 'Minuman' },
  { label: 'Makanan', value: 'Makanan' },
  { label: 'Snack', value: 'Snack' },
]

const validateForm = () => {
  errors.value = {}

  if (!form.value.nama) {
    errors.value.nama = 'Nama diskon harus diisi'
  }

  if (!form.value.persentase || form.value.persentase < 0 || form.value.persentase > 100) {
    errors.value.persentase = 'Persentase harus antara 0-100'
  }

  if (!form.value.status) {
    errors.value.status = 'Status harus dipilih'
  }

  if (!form.value.minimalPembelian || form.value.minimalPembelian < 0) {
    errors.value.minimalPembelian = 'Minimal pembelian harus diisi dan tidak boleh negatif'
  }

  if (!form.value.kuota || form.value.kuota < 0) {
    errors.value.kuota = 'Kuota harus diisi dan tidak boleh negatif'
  }

  if (!form.value.berlakuUntuk) {
    errors.value.berlakuUntuk = 'Berlaku untuk harus dipilih'
  }

  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  loading.value = true

  try {
    const apiUrl = localStorage.getItem('apiUrl')
    if (!apiUrl) {
      alert(
        'API URL belum diset. Silakan kembali ke halaman utama dan set API URL terlebih dahulu.',
      )
      return
    }

    apiService.setBaseURL(apiUrl)

    const data = {
      nama: form.value.nama,
      persentase: Number(form.value.persentase),
      status: form.value.status,
      minimalPembelian: Number(form.value.minimalPembelian),
      kuota: Number(form.value.kuota),
      berlakuUntuk: form.value.berlakuUntuk,
      deskripsi: form.value.deskripsi,
    }

    if (isEdit.value) {
      await apiService.update(route.params.id, data)
    } else {
      await apiService.create(data)
    }

    router.push('/diskon')
  } catch (error) {
    console.error('Error saving:', error)
    alert('Gagal menyimpan data: ' + error.message)
  } finally {
    loading.value = false
  }
}

const loadData = async () => {
  if (!isEdit.value) return

  loading.value = true
  try {
    const apiUrl = localStorage.getItem('apiUrl')
    if (!apiUrl) {
      alert('API URL belum diset')
      router.push('/diskon')
      return
    }

    apiService.setBaseURL(apiUrl)
    const data = await apiService.getById(route.params.id)

    form.value = {
      nama: data.nama,
      persentase: data.persentase,
      status: data.status,
      minimalPembelian: data.minimalPembelian,
      kuota: data.kuota,
      berlakuUntuk: data.berlakuUntuk,
      deskripsi: data.deskripsi || '',
    }
  } catch (error) {
    console.error('Error loading data:', error)
    alert('Gagal memuat data: ' + error.message)
    router.push('/diskon')
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.push('/diskon')
}

onMounted(() => {
  loadData()
})
</script>
