import axios from 'axios'

// Dummy data
const dummyData = [
  {
    _id: '1',
    nama: 'Diskon Hari Raya',
    persentase: 20,
    status: 'Aktif',
    minimalPembelian: 100000,
    kuota: 50,
    berlakuUntuk: 'Semua Produk',
    deskripsi: 'Diskon spesial untuk merayakan hari raya',
  },
  {
    _id: '2',
    nama: 'Diskon Member',
    persentase: 15,
    status: 'Aktif',
    minimalPembelian: 50000,
    kuota: 100,
    berlakuUntuk: 'Minuman',
    deskripsi: 'Diskon khusus member untuk kategori minuman',
  },
  {
    _id: '3',
    nama: 'Diskon Weekend',
    persentase: 10,
    status: 'Tidak Aktif',
    minimalPembelian: 75000,
    kuota: 30,
    berlakuUntuk: 'Makanan',
    deskripsi: 'Diskon akhir pekan untuk makanan',
  },
  {
    _id: '4',
    nama: 'Flash Sale',
    persentase: 30,
    status: 'Aktif',
    minimalPembelian: 150000,
    kuota: 20,
    berlakuUntuk: 'Semua Produk',
    deskripsi: 'Diskon terbatas waktu untuk semua produk',
  },
  {
    _id: '5',
    nama: 'Diskon Pelanggan Baru',
    persentase: 25,
    status: 'Aktif',
    minimalPembelian: 0,
    kuota: 200,
    berlakuUntuk: 'Semua Produk',
    deskripsi: 'Selamat datang! Nikmati diskon untuk pembelian pertama',
  },
]

class ApiService {
  constructor() {
    this.baseURL = ''
    this.useDummy = true
    this.dummyStorage = [...dummyData]
  }

  setMode(useDummy) {
    this.useDummy = useDummy
    if (useDummy) {
      // Reset dummy data when switching to dummy mode
      this.dummyStorage = [...dummyData]
    }
  }

  setBaseURL(url) {
    this.baseURL = url
  }

  // Dummy mode methods
  async getDummyAll() {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    return [...this.dummyStorage]
  }

  async getDummyById(id) {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const item = this.dummyStorage.find((d) => d._id === id)
    if (!item) throw new Error('Data tidak ditemukan')
    return { ...item }
  }

  async createDummy(data) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const newId = (Math.max(...this.dummyStorage.map((d) => parseInt(d._id))) + 1).toString()
    const newItem = { _id: newId, ...data }
    this.dummyStorage.push(newItem)
    return newItem
  }

  async updateDummy(id, data) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const index = this.dummyStorage.findIndex((d) => d._id === id)
    if (index === -1) throw new Error('Data tidak ditemukan')
    this.dummyStorage[index] = { _id: id, ...data }
    return this.dummyStorage[index]
  }

  async deleteDummy(id) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const index = this.dummyStorage.findIndex((d) => d._id === id)
    if (index === -1) throw new Error('Data tidak ditemukan')
    this.dummyStorage.splice(index, 1)
    return { success: true }
  }

  // API mode methods
  async getAll() {
    if (this.useDummy) return this.getDummyAll()

    if (!this.baseURL) throw new Error('API URL belum diset')
    const response = await axios.get(this.baseURL)
    return Object.entries(response.data).map(([id, data]) => ({
      _id: id,
      ...data,
    }))
  }

  async getById(id) {
    if (this.useDummy) return this.getDummyById(id)

    if (!this.baseURL) throw new Error('API URL belum diset')
    const response = await axios.get(`${this.baseURL}/${id}`)
    return { _id: id, ...response.data }
  }

  async create(data) {
    if (this.useDummy) return this.createDummy(data)

    if (!this.baseURL) throw new Error('API URL belum diset')
    const response = await axios.post(this.baseURL, data)
    return response.data
  }

  async update(id, data) {
    if (this.useDummy) return this.updateDummy(id, data)

    if (!this.baseURL) throw new Error('API URL belum diset')
    const response = await axios.put(`${this.baseURL}/${id}`, data)
    return response.data
  }

  async delete(id) {
    if (this.useDummy) return this.deleteDummy(id)

    if (!this.baseURL) throw new Error('API URL belum diset')
    const response = await axios.delete(`${this.baseURL}/${id}`)
    return response.data
  }
}

export default new ApiService()
