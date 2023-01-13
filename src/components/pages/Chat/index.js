import Handlebars from 'handlebars'
import tpl from 'bundle-text:./tpl.hbs'
import styles from './ChatModule.scss'

Handlebars.registerPartial('Chat', tpl)

export default (props = {}) => {
  return Handlebars.compile(tpl)(props)
}
