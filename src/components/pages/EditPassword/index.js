import Handlebars from 'handlebars'
import tpl from 'bundle-text:./tpl.hbs'
import Button from '../../UI/Button'
import styles from './ProfileModule.scss'

Handlebars.registerPartial('EditPassword', tpl)

export default (props = {}) => {
  return Handlebars.compile(tpl)(props)
}
