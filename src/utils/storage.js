/**
 * localStorage 工具类
 */

const DEFAULT_PREFIX = 'luosifen_'

export const storage = {
  /**
   * 获取数据
   * @param {string} key - 键名
   * @param {any} defaultValue - 默认值
   * @returns {any}
   */
  get(key, defaultValue = null) {
    try {
      const prefixedKey = DEFAULT_PREFIX + key
      const value = localStorage.getItem(prefixedKey)

      if (value === null) {
        return defaultValue
      }

      return JSON.parse(value)
    } catch (error) {
      console.error('Storage get error:', error)
      return defaultValue
    }
  },

  /**
   * 设置数据
   * @param {string} key - 键名
   * @param {any} value - 值
   */
  set(key, value) {
    try {
      const prefixedKey = DEFAULT_PREFIX + key
      localStorage.setItem(prefixedKey, JSON.stringify(value))
      return true
    } catch (error) {
      console.error('Storage set error:', error)
      return false
    }
  },

  /**
   * 删除数据
   * @param {string} key - 键名
   */
  remove(key) {
    try {
      const prefixedKey = DEFAULT_PREFIX + key
      localStorage.removeItem(prefixedKey)
      return true
    } catch (error) {
      console.error('Storage remove error:', error)
      return false
    }
  },

  /**
   * 清空所有数据
   */
  clear() {
    try {
      const keys = Object.keys(localStorage)
      keys.forEach(key => {
        if (key.startsWith(DEFAULT_PREFIX)) {
          localStorage.removeItem(key)
        }
      })
      return true
    } catch (error) {
      console.error('Storage clear error:', error)
      return false
    }
  },

  /**
   * 检查键是否存在
   * @param {string} key - 键名
   * @returns {boolean}
   */
  has(key) {
    const prefixedKey = DEFAULT_PREFIX + key
    return localStorage.getItem(prefixedKey) !== null
  }
}

export default storage
