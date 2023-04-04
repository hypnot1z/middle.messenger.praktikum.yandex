import tpl from './tpl.hbs'
import './DropdownModule.scss'
import Block from '../../../utils/Block/block'
import treeDots from '../../../img/three-dots.svg'
import Button from '../Button'
import store from '../../../utils/Store'
import ChatController from '../../../controllers/ChatController'

const src: string = treeDots

interface DropdownProps {
  tagName?: string
  selectedChat: any
  img?: string
  alt?: string
  className?: string
  events?: {
    click: () => void
  }
}

export class Dropdown extends Block<DropdownProps> {
  constructor(props: DropdownProps) {
    super({
      ...props,
      tagName: 'div',
      img: src,
      alt: 'Меню',
      className: 'dropdown',
      events: {
        click: () => this.show(),
      },
    })
    // console.log('DROPDOWN PROPS', this.props)
  }

  init() {
    this.children.deleteChat = new Button({
      text: 'Delete chat',
      type: 'button',
      id: 'delchat-btn',
      class: 'dropdown-item',
      events: {
        click: () => this.deleteChat(),
      },
    })
  }

  deleteChat() {
    const { selectedChat } = store.getState()
    console.log('this delete chat ID', selectedChat.id)
    ChatController.deleteChat(selectedChat.id)
    store.set('selectedChat', '')
  }

  protected render(): DocumentFragment {
    return this.compile(tpl, this.props)
  }

  public show(): void {
    const dropdownMenu: HTMLElement | null =
      document.querySelector('.dropdown-menu')
    console.log('SHOW', dropdownMenu)
    dropdownMenu!.classList.add('show')
    window.addEventListener('click', function (event) {
      if (!event.target.matches('.dots-btn')) {
        if (dropdownMenu?.classList.contains('show')) {
          dropdownMenu.classList.remove('show')
        }
      }
    })
  }
}
