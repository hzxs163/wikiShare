export function epochToDateInput(value: number | null | undefined): string {
  if (!value) {
    return ''
  }
  const date = new Date(value * 1000)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function dateInputToEpoch(value: string): number | null {
  if (!value) {
    return null
  }
  const time = new Date(`${value}T23:59:59`).getTime()
  if (Number.isNaN(time)) {
    return null
  }
  return Math.floor(time / 1000)
}

export function formatDateTime(value: number | null | undefined): string {
  if (!value) {
    return '未设置'
  }
  return new Date(value * 1000).toLocaleString('zh-CN')
}

export function formatDate(value: number | null | undefined): string {
  if (!value) {
    return '长期有效'
  }
  return new Date(value * 1000).toLocaleDateString('zh-CN')
}
