import Handlebars from 'handlebars'
import tpl from 'bundle-text:./tpl.hbs'
import styles from './ButtonModule.scss'

Handlebars.registerPartial('Button', tpl)

export default (id, value) => {
  return Handlebars.compile(tpl)({ id, value })
}
