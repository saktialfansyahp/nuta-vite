<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-12">
    <div class="flex flex-col items-center justify-center text-center max-w-md mx-auto py-12">
      <div class="mb-8">
        <svg class="w-64 h-48" viewBox="0 0 200 150" fill="none">
          <ellipse cx="100" cy="120" rx="90" ry="25" fill="#FF8A80" opacity="0.5" />
          <ellipse cx="100" cy="115" rx="85" ry="22" fill="#FF6B6B" />
          <path d="M50 70 L150 70 L140 110 L60 110 Z" fill="#FFD93D" />
          <path d="M150 70 L140 110 L140 115 L150 75 Z" fill="#FFC107" />
          <circle cx="80" cy="85" r="6" fill="#FF6B6B" />
          <circle cx="110" cy="82" r="8" fill="#FF6B6B" />
          <circle cx="95" cy="95" r="5" fill="#FF6B6B" />
          <path d="M130 60 L135 65 L70 115 L65 110 Z" fill="#37474F" />
          <path d="M135 65 L140 70 L75 120 L70 115 Z" fill="#546E7A" />
          <path d="M60 55 Q70 45 80 55" stroke="#4CAF50" stroke-width="2" fill="none" />
          <circle cx="85" cy="52" r="4" fill="#4CAF50" />
          <path d="M140 50 Q150 40 160 50" stroke="#4CAF50" stroke-width="2" fill="none" />
          <circle cx="165" cy="47" r="4" fill="#4CAF50" />
          <ellipse cx="165" cy="115" rx="18" ry="12" fill="#FFD93D" />
          <circle cx="172" cy="112" r="2" fill="#333" />
          <path d="M173 115 Q175 117 177 115" stroke="#333" stroke-width="1" fill="none" />
          <ellipse cx="158" cy="108" rx="4" ry="6" fill="#FFD93D" />
          <ellipse cx="172" cy="108" rx="4" ry="6" fill="#FFD93D" />
        </svg>
      </div>

      <h2 class="text-xl font-semibold text-gray-900 mb-3">Belum Ada Diskon</h2>
      <p class="text-gray-600 mb-8 leading-relaxed">
        Silahkan tambah diskon untuk menarik pelanggan dan<br />
        meningkatakan penjualan.
      </p>

      <button
        @click="$emit('add-diskon')"
        class="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-4xl transition-colors shadow-sm"
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'DiskonEmpty',
  emits: ['add-diskon'],
}
</script>
