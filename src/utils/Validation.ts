import Pattern from './pattern'

export default function Validation(event: Event) {
  const errorElement: HTMLElement | null = event.target!.nextElementSibling
  const targetPattern: RegExp = new RegExp(Pattern[event.target.name])
  const value: string = event.target!.value

  if (!targetPattern.test(value)) {
    errorElement!.style.display = 'block'
  } else {
    errorElement!.style.display = 'none'
  }
}
