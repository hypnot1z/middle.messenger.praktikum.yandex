import tpl from './tpl.hbs'
import './DropdownModule.scss'
import Block from '../../../utils/Block/block'
import treeDots from '../../../img/three-dots.svg'

const src: string = treeDots

interface DropdownProps {
  selectedChat: any
  img?: string
  alt?: string
  class?: string
  events?: {
    click: () => void
  }
}

export class Dropdown extends Block<DropdownProps> {
  constructor(props: DropdownProps) {
    super({
      ...props,
      img: src,
      alt: 'Меню',
      class: 'dots-btn',
      events: {
        click: () => this.show(),
      },
    })
    console.log('DROPDOWN PROPS', this.props)
  }

  protected render(): DocumentFragment {
    return this.compile(tpl, this.props)
  }

  public show(): void {
    const dropdownMenu: HTMLElement | null =
      document.querySelector('.dropdown-menu')
    console.log('SHOW', dropdownMenu)
    dropdownMenu!.style.display = 'block'
  }
}
