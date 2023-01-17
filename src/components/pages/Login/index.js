import Handlebars from 'handlebars'
import tpl from 'bundle-text:./tpl.hbs'
import Button from '../../UI/Button'
import styles from './LoginModule.scss'

Handlebars.registerPartial('Login', tpl)

export default (props = {}) => {
  return Handlebars.compile(tpl)(props)
}
