export default function FormData(event: Event) {
  // console.log(arguments)
  event.preventDefault()
  const data: Record<string, string> = {}
  const form: HTMLFormElement | null = document.forms[0]

  if (form) {
    for (let field of form) {
      //@ts-ignore
      const { name } = field
      if (name) {
        //@ts-ignore
        data[name] = field.value
      }
    }
    // console.log(data)
    return data
  }
}
