import * as FiIcons from 'react-icons/fi'

export function getIcon(name) {
  const Icon = FiIcons[name]
  return Icon ? <Icon /> : null
}
