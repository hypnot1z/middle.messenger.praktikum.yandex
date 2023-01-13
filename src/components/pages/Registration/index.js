import Handlebars from 'handlebars'
import tpl from 'bundle-text:./tpl.hbs'
import styles from './RegistrModule.scss'
import Button from '../../UI/Button'

Handlebars.registerPartial('Registr', tpl)

export default (props = {}) => {
  return Handlebars.compile(tpl)(props)
}
