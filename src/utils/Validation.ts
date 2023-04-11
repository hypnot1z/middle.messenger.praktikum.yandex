import Pattern from './pattern'

export default function Validation(event: Event) {
  const element = event.target as HTMLInputElement
  const errorElement = element.nextElementSibling as HTMLElement
  const targetPattern: RegExp = new RegExp(Pattern[element.name])
  const value: string = element.value

  if (!targetPattern.test(value)) {
    errorElement!.style.display = 'block'
  } else {
    errorElement!.style.display = 'none'
  }
}
