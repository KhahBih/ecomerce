import React, { useState } from 'react';
import { LogoutOutlined, UserOutlined, UserAddOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import {Link, useSearchParams} from 'react-router-dom'
import { signOut, getAuth } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import useSelection from 'antd/es/table/hooks/useSelection';

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState('mail');
  let dispatch = useDispatch()
  let state = useSelector((state) => state)
  let user = state.user

  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  const logout = () => {
    const auth = getAuth();
    signOut(auth)
    .then(() => {
      dispatch({
        type: 'LOGOUT',
        payload: null
      })
    }).catch((error) => {
      
    });
    window.history.pushState({}, undefined, "/home");
  }
  return (
    <>
      <Menu onClick={onClick} mode="horizontal" style={{display: 'block'}}>
        <Item key='home' icon={<UserAddOutlined />}><Link to='/'>Home</Link></Item>
        {!user && (
          <Item key='login' icon={<UserAddOutlined />} className="float-end"><Link to='/login'>Login</Link></Item>
        )}

        {!user && (
          <Item key='register' icon={<UserAddOutlined />} className="float-end"><Link to='/register'>Register</Link></Item>
        )}

        {user && (
          <Menu.SubMenu key='app' icon={<UserAddOutlined />} className='float-end' title={!state ? '' : state.user.email}>
            <Menu.Item>AAA</Menu.Item>
            <Menu.Item>AAA</Menu.Item>
            <Menu.Item icon={< LogoutOutlined />} onClick={logout}>Log out</Menu.Item>
          </Menu.SubMenu>
        )}
        
      </Menu>
    </>
  )
};
export default Header;