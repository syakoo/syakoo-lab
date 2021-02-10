const zfill = (n: number) => `00${n}`.slice(-2)

export const formatDate = (dateStr: string) => {
  const d = new Date(dateStr)
  return `${d.getFullYear()}-${zfill(d.getMonth() + 1)}-${zfill(d.getDate())}`
}
