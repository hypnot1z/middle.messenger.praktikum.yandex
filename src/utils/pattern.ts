const Pattern: Record<string, string> = {
  email: '[a-zA-Z\\d-]+@+[a-zA-Z\\d-]+\\.+[a-zA-Z\\d-]*', // '[a-zA-Z\d-]+@+[a-zA-Z\d-]+.+[a-zA-Z\d-]*'
  login: '^[^\\d][^\\s][a-zA-Z\\d_-]{1,18}$', //
  firstName: '^[A-ZА-ЯЁ][^\\d^\\s][a-zа-яё-]*',
  secondName: '^[A-ZА-ЯЁ][^\\d^\\s][a-zа-яё-]*',
  displayName: '^[^\\d][^\\s][a-zA-Z\\d_-]{1,18}$',
  phone: '^[\\+]?[0-9]{10,15}$', //
  password:
    '^(?=^.{8,40}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$',
  searchChat: '^[^\\d][^\\s][a-zA-Z\\d_-]{1,18}$',
  searchMessage: '.*',
  sendMessage: '.*',
  oldPassword:
    '^(?=^.{8,40}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$',
  newPassword:
    '^(?=^.{8,40}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$',
  title: '^[^\\d][^\\s][a-zA-Z\\d_-]{1,18}$',
}

export default Pattern
