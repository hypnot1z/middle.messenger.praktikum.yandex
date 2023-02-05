import Handlebars from 'handlebars'
import tpl from 'bundle-text:./tpl.hbs'
import Block from '../../../utils/Block/block'

class PageErr extends Block {
  constructor(props) {
    super('div', props)
  }

  render() {
    const compile = Handlebars.compile(tpl)
    const res = compile({
      code: this.props.code,
      text: this.props.text,
    })

    return res
  }
}

const NotFound = new PageErr({ code: '404', text: 'Не туда попали' })
export default NotFound
