export function requiredString(value: unknown, field: string, maxLength: number) {
  if (typeof value !== 'string' || !value.trim()) {
    throw createError({ statusCode: 400, message: `${field} es obligatorio.` })
  }
  const normalized = value.trim()
  if (normalized.length > maxLength) {
    throw createError({ statusCode: 400, message: `${field} excede ${maxLength} caracteres.` })
  }
  return normalized
}

export function optionalString(value: unknown, maxLength: number) {
  if (value === undefined || value === null || value === '') return null
  if (typeof value !== 'string' || value.trim().length > maxLength) {
    throw createError({ statusCode: 400, message: 'Valor de texto inválido.' })
  }
  return value.trim()
}

export function optionalUrl(value: unknown) {
  const normalized = optionalString(value, 1000)
  if (!normalized) return null
  try {
    const url = new URL(normalized)
    if (!['http:', 'https:'].includes(url.protocol)) throw new Error()
    return url.toString()
  } catch {
    throw createError({ statusCode: 400, message: 'URL inválida.' })
  }
}

export function enumValue<T extends string>(value: unknown, allowed: readonly T[], field: string): T {
  if (typeof value !== 'string' || !allowed.includes(value as T)) {
    throw createError({ statusCode: 400, message: `${field} no es válido.` })
  }
  return value as T
}

export function slugValue(value: unknown) {
  const slug = requiredString(value, 'Slug', 120).toLowerCase()
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw createError({ statusCode: 400, message: 'El slug solo admite letras minúsculas, números y guiones.' })
  }
  return slug
}

export function integerValue(value: unknown, field: string, min: number, max: number) {
  const parsed = typeof value === 'number' ? value : Number(value)
  if (!Number.isInteger(parsed) || parsed < min || parsed > max) {
    throw createError({ statusCode: 400, message: `${field} no es válido.` })
  }
  return parsed
}

export function optionalDate(value: unknown) {
  if (value === undefined || value === null || value === '') return null
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(value))) {
    throw createError({ statusCode: 400, message: 'Fecha inválida.' })
  }
  return value
}
