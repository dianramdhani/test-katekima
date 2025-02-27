import { createI18n } from 'vue-i18n'
import { loadFromLocalStorage, STORAGE_KEY_LANG } from './helpers'

const i18n = createI18n({
  locale: loadFromLocalStorage(STORAGE_KEY_LANG, 'id'),
  fallbackLocale: 'en',
  messages: {
    en: {
      common: {
        save: 'Save',
        update: 'Update',
        select: 'Select',
        page: 'Page',
        move: 'Move',
        formEdit: 'Form Edit',
        formCreate: 'Form Create',
      },
      product: {
        product: 'Product',
        no: 'No',
        name: 'Name',
        action: 'Action',
        searchProduct: 'Search Product',
        productDetail: 'Product Detail',
        inputName: 'Input Name',
        selectOrInputName: 'Select or input name...',
      },
    },
    id: {
      common: {
        save: 'Simpan',
        update: 'Ubah',
        select: 'Pilih',
        page: 'Halaman',
        move: 'Pindah',
        formEdit: 'Formulir Sunting',
        formCreate: 'Formulir Tambah',
      },
      product: {
        product: 'Produk',
        no: 'No',
        name: 'Nama',
        action: 'Aksi',
        searchProduct: 'Cari Produk',
        productDetail: 'Detail Produk',
        inputName: 'Masukkan Nama',
        selectOrInputName: 'Pilih atau ketik nama...',
      },
    },
  },
})

export default i18n
