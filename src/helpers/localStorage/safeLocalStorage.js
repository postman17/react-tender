export const safeLocalStorage = {
  getItem(key) {
    let value;

    try {
      value = localStorage.getItem(key);
    } catch {
      return undefined;
    }

    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        safeLocalStorage.removeItem(key);

        return undefined;
      }
    }

    return value;
  },

  setItem(key, value) {
    const stringifiedValue = JSON.stringify(value);

    try {
      localStorage.setItem(key, stringifiedValue);
    } catch (error) {
        localStorage.clear();
    }
  },

  removeItem(key) {
    try {
      localStorage.removeItem(key);
    } catch {
      /* Silent */
    }
  },

  clear() {
    localStorage.clear();
  },
};
