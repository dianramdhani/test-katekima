export const STORAGE_KEY_PRODUCTS = 'cached_products'
export const STORAGE_KEY_NAMES = 'cached_names'
export const STORAGE_KEY_LANG = 'lang'

export const loadFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  const stored = localStorage.getItem(key)
  return stored ? (JSON.parse(stored) as T) : defaultValue
}

export const saveToLocalStorage = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value))
}
