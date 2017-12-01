import * as React from 'react'
import { Input, Label, Menu } from 'semantic-ui-react'

export default class MenuExampleVertical extends React.Component {
  state = { activeItem: 'inbox' }

  render() {
    const { activeItem } = this.state

    return (
      <Menu vertical>
        <Menu.Item name='inbox' active={activeItem === 'inbox'}>
          <Label color='teal'>1</Label>
          Inbox
        </Menu.Item>

        <Menu.Item name='spam' active={activeItem === 'spam'}>
          <Label>51</Label>
          Spam
        </Menu.Item>

        <Menu.Item name='updates' active={activeItem === 'updates'}>
          <Label>1</Label>
          Updates
        </Menu.Item>
        <Menu.Item>
          <Input icon='search' placeholder='Search for orginzations' />
        </Menu.Item>
      </Menu>
    )
  }
}
