export const getFromLocalStorage = (keyName: string, defaultValue: null) => {
  try {
    const value = window.localStorage.getItem(keyName);
    if (value) {
      return JSON.parse(value);
    } else {
      window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
      return defaultValue;
    }
  } catch (err) {
    return defaultValue;
  }
}

export const setToLocalStorage = (keyName: string, newValue: null | never) => {
  try {
    window.localStorage.setItem(keyName, JSON.stringify(newValue));
  } catch (err) {
    console.log(err);
  }
}