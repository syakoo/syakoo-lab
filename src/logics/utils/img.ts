type Size = { width: number; height: number }

// __________
//
export const reSize = (size: Size, maxSize: Partial<Size>): Size => {
  let scale = 0

  if (maxSize.width) {
    scale = Math.max(scale, maxSize.width / size.width)
  }
  if (maxSize.height) {
    scale = Math.max(scale, maxSize.height / size.height)
  }

  return { width: size.width * scale, height: size.height * scale }
}
