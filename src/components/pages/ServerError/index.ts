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

const ServerError = new PageErr({ code: '500', text: 'Мы уже фиксим' })
export default ServerError
