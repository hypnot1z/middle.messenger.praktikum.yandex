declare module '*.png'
declare module '*.svg'
declare module '*.jpg'
declare module '*.scss'
declare module '*.hbs' {
  import { TemplateDelegate } from 'handlebars'

  declare const template: TemplateDelegate

  export default template
}
