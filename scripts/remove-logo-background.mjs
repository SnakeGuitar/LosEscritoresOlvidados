#!/usr/bin/env node

/**
 * Removes a flat background connected to the outside edge of a PNG.
 *
 * This intentionally uses only Node built-ins so the brand asset can be
 * regenerated without installing ImageMagick, Sharp or Pillow.
 *
 * Usage:
 *   node scripts/remove-logo-background.mjs [input.png] [output.png] [threshold]
 *
 * The flood-fill starts at the image border. That means white details enclosed
 * by the raccoon's outline are preserved while the exterior background is made
 * transparent.
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { deflateSync, inflateSync } from 'node:zlib'

const input = resolve(process.argv[2] ?? 'assets/gaby-white.png')
const output = resolve(process.argv[3] ?? 'app/assets/gaby-logo.png')
const threshold = Number(process.argv[4] ?? 72)
const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])

const crcTable = Array.from({ length: 256 }, (_, value) => {
  let crc = value
  for (let bit = 0; bit < 8; bit += 1) crc = (crc & 1) ? (0xedb88320 ^ (crc >>> 1)) : (crc >>> 1)
  return crc >>> 0
})

function crc32(buffer) {
  let crc = 0xffffffff
  for (const byte of buffer) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8)
  return (crc ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
  const name = Buffer.from(type)
  const size = Buffer.alloc(4)
  const checksum = Buffer.alloc(4)
  size.writeUInt32BE(data.length)
  checksum.writeUInt32BE(crc32(Buffer.concat([name, data])))
  return Buffer.concat([size, name, data, checksum])
}

function paeth(left, above, upperLeft) {
  const estimate = left + above - upperLeft
  const leftDistance = Math.abs(estimate - left)
  const aboveDistance = Math.abs(estimate - above)
  const upperLeftDistance = Math.abs(estimate - upperLeft)
  return leftDistance <= aboveDistance && leftDistance <= upperLeftDistance
    ? left
    : aboveDistance <= upperLeftDistance ? above : upperLeft
}

function decodePng(buffer) {
  if (!buffer.subarray(0, 8).equals(signature)) throw new Error('El archivo de entrada no es un PNG válido.')

  let offset = 8
  let width = 0
  let height = 0
  let bitDepth = 0
  let colorType = 0
  const idat = []

  while (offset < buffer.length) {
    const length = buffer.readUInt32BE(offset)
    const type = buffer.toString('ascii', offset + 4, offset + 8)
    const data = buffer.subarray(offset + 8, offset + 8 + length)
    if (type === 'IHDR') {
      width = data.readUInt32BE(0)
      height = data.readUInt32BE(4)
      bitDepth = data[8]
      colorType = data[9]
      if (data[12] !== 0) throw new Error('Los PNG entrelazados no están soportados.')
    }
    if (type === 'IDAT') idat.push(data)
    offset += length + 12
  }

  if (bitDepth !== 8 || ![2, 6].includes(colorType)) {
    throw new Error(`Formato PNG no soportado (profundidad ${bitDepth}, tipo ${colorType}). Usa RGB o RGBA de 8 bits.`)
  }

  const channels = colorType === 6 ? 4 : 3
  const rowLength = width * channels
  const compressed = inflateSync(Buffer.concat(idat))
  const raw = Buffer.alloc(height * rowLength)

  for (let y = 0; y < height; y += 1) {
    const sourceRow = y * (rowLength + 1)
    const targetRow = y * rowLength
    const filter = compressed[sourceRow]
    for (let x = 0; x < rowLength; x += 1) {
      const source = compressed[sourceRow + 1 + x]
      const left = x >= channels ? raw[targetRow + x - channels] : 0
      const above = y > 0 ? raw[targetRow - rowLength + x] : 0
      const upperLeft = y > 0 && x >= channels ? raw[targetRow - rowLength + x - channels] : 0
      const value = filter === 0 ? source
        : filter === 1 ? source + left
          : filter === 2 ? source + above
            : filter === 3 ? source + Math.floor((left + above) / 2)
              : filter === 4 ? source + paeth(left, above, upperLeft)
                : (() => { throw new Error(`Filtro PNG desconocido: ${filter}`) })()
      raw[targetRow + x] = value & 0xff
    }
  }

  const rgba = Buffer.alloc(width * height * 4)
  for (let pixel = 0; pixel < width * height; pixel += 1) {
    rgba[pixel * 4] = raw[pixel * channels]
    rgba[pixel * 4 + 1] = raw[pixel * channels + 1]
    rgba[pixel * 4 + 2] = raw[pixel * channels + 2]
    rgba[pixel * 4 + 3] = channels === 4 ? raw[pixel * channels + 3] : 255
  }
  return { width, height, rgba }
}

function encodePng(width, height, rgba) {
  const header = Buffer.alloc(13)
  header.writeUInt32BE(width, 0)
  header.writeUInt32BE(height, 4)
  header[8] = 8
  header[9] = 6
  const scanlines = Buffer.alloc(height * (width * 4 + 1))
  for (let y = 0; y < height; y += 1) {
    const row = y * (width * 4 + 1)
    scanlines[row] = 0
    rgba.copy(scanlines, row + 1, y * width * 4, (y + 1) * width * 4)
  }
  return Buffer.concat([
    signature,
    chunk('IHDR', header),
    chunk('IDAT', deflateSync(scanlines, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

function removeConnectedBackground({ width, height, rgba }) {
  const reference = [rgba[0], rgba[1], rgba[2]]
  const visited = new Uint8Array(width * height)
  const queue = new Int32Array(width * height)
  let head = 0
  let tail = 0

  const distance = (index) => {
    const offset = index * 4
    return Math.sqrt(
      (rgba[offset] - reference[0]) ** 2
      + (rgba[offset + 1] - reference[1]) ** 2
      + (rgba[offset + 2] - reference[2]) ** 2,
    )
  }

  const enqueue = (index) => {
    if (visited[index] || distance(index) > threshold) return
    visited[index] = 1
    queue[tail++] = index
  }

  for (let x = 0; x < width; x += 1) {
    enqueue(x)
    enqueue((height - 1) * width + x)
  }
  for (let y = 0; y < height; y += 1) {
    enqueue(y * width)
    enqueue(y * width + width - 1)
  }

  while (head < tail) {
    const index = queue[head++]
    const x = index % width
    const y = Math.floor(index / width)
    const colorDistance = distance(index)
    // Keep a soft one-pixel antialiased fringe instead of a jagged cut.
    rgba[index * 4 + 3] = colorDistance <= threshold * 0.45
      ? 0
      : Math.round(255 * ((colorDistance - threshold * 0.45) / (threshold * 0.55)))
    if (x > 0) enqueue(index - 1)
    if (x + 1 < width) enqueue(index + 1)
    if (y > 0) enqueue(index - width)
    if (y + 1 < height) enqueue(index + width)
  }

  return { width, height, rgba, removed: tail }
}

const decoded = decodePng(await readFile(input))
const cleaned = removeConnectedBackground(decoded)
await mkdir(dirname(output), { recursive: true })
await writeFile(output, encodePng(cleaned.width, cleaned.height, cleaned.rgba))
console.log(`Logo generado: ${output}`)
console.log(`Píxeles de fondo procesados: ${cleaned.removed.toLocaleString('es-MX')}`)
