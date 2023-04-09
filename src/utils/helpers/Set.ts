export type Indexed<T = any> = {
  [key: string]: T
}

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  const result = Object.assign({}, lhs)

  for (let p in rhs) {
    if (p in rhs) {
      if (typeof rhs[p] === 'object' && rhs[p] !== null) {
        result[p] = merge(result[p] as Indexed, rhs[p] as Indexed)
      } else {
        result[p] = rhs[p]
      }
    }
  }

  return result
}

export function set(object: Indexed, path: string, value: unknown): Indexed {
  if (typeof object !== 'object' || object === null) {
    throw new Error('object must be an object')
  }
  if (typeof path !== 'string') {
    throw new Error('path must be a string')
  }

  const pathParts = path.split('.')
  const lastKey = pathParts.pop() as string
  const newObj = Object.assign({}, object)
  let currObj = newObj

  for (const key of pathParts) {
    currObj[key] = Object.assign({}, currObj[key])
    currObj = currObj[key]
  }

  currObj[lastKey] = value
  return newObj
}
