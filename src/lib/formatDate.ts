import { format, parseISO } from 'date-fns'

function addOrdinalSuffix(day: number): string {
  const suffixes = ['th', 'st', 'nd', 'rd']
  const mod10 = day % 10
  const mod100 = day % 100
  if (mod10 === 1 && mod100 !== 11) return `${day}st`
  if (mod10 === 2 && mod100 !== 12) return `${day}nd`
  if (mod10 === 3 && mod100 !== 13) return `${day}rd`
  return `${day}th`
}

function formatDate(dateStr: string): string {
  const date = parseISO(dateStr)

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date string')
  }

  const day = date.getDate()
  const month = format(date, 'MMM')
  const year = format(date, 'yyyy')

  const dayWithSuffix = addOrdinalSuffix(day)

  return `${dayWithSuffix} ${month} ${year}`
}

export default formatDate
