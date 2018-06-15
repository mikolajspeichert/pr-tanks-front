const keys = {
  host: 'host',
  port: 'port',
}

const save = (key, value) => {
  localStorage.setItem(key, value) // eslint-disable-line no-undef
}

const get = key => localStorage.getItem(key) // eslint-disable-line no-undef

const remove = key => {
  localStorage.removeItem(key) // eslint-disable-line no-undef
}

export { save, get, keys, remove }
