import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined, UserOutlined, UserAddOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import {Link} from 'react-router-dom'

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (
    <>
      <Menu onClick={onClick} mode="horizontal" style={{display: 'block'}}>
        <Item key='home' icon={<UserAddOutlined />}><Link to='/'>Home</Link></Item>
        <Item key='login' icon={<UserAddOutlined />} className="float-end"><Link to='/login'>Login</Link></Item>
        <Item key='register' icon={<UserAddOutlined />} className="float-end"><Link to='/register'>Register</Link></Item>
        <Menu.SubMenu key='app' icon={<UserAddOutlined />}  title='Username'>
          <Menu.Item>AAA</Menu.Item>
          <Menu.Item>AAA</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </>
  )
};
export default Header;