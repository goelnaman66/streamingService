import React from 'react';
import { Menu } from 'antd';


function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="home">
        <a href="/">Home</a>
      </Menu.Item>
      <Menu.Item key="favorite">
        <a href="/favorite">Favorite</a>
      </Menu.Item>
      <Menu.Item key="recommendations">
        <a href="/recommendation">Recommendations</a>
      </Menu.Item>
      <Menu.Item key="search">
        <a href="/search">Search</a>
      </Menu.Item>
      {/* <Menu.Item key="content">
        <a href="/recommend">Content</a>
      </Menu.Item> */}
    </Menu>
  )
}

export default LeftMenu