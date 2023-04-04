export type Indexed<T = any> = {
  [key in string]: T
}

export function mapObject<T, R>(
  obj: Indexed<T>,
  mapFn: (value: T, key: string) => R
): Indexed<R> {
  const mappedObj: Indexed<R> = {}
  Object.keys(obj).forEach((key) => {
    mappedObj[key] = mapFn(obj[key], key)
  })
  return mappedObj
}
