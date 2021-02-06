const zfill = (n) => ('00' + n).slice(-2)

module.exports = {
  templates: `${__dirname}/.hygen`,
  helpers: {
    now: () => {
      const d = new Date()
      return `${d.getFullYear()}-${zfill(d.getMonth() + 1)}-${zfill(
        d.getDate()
      )}`
    },
    dirName: () => {
      const d = new Date()
      return `${d.getFullYear()}${zfill(d.getMonth() + 1)}${zfill(d.getDate())}`
    },
  },
}
