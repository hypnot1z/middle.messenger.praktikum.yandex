import Handlebars from 'handlebars'
import tpl from 'bundle-text:./tpl.hbs'

Handlebars.registerPartial('NotFound', tpl)

export default (props = {}) => {
  return Handlebars.compile(tpl)(props)
}
