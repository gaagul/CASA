import React from 'react'
import { Button, Layout, Menu, Space } from 'antd';
import { Typography } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import { getFromLocalStorage } from '../hooks/useLocalStorage';
import AvatarMenu from './CustomAvatar';

const { Header } = Layout;
const { Title } = Typography;

const Nav = () => {
    const isLoggedIn = getFromLocalStorage("isLoggedIn");
    return (
        <>
            <div className="nav-wrapper">
                <div className="nav-centering-wrapper">
                    <Space direction='horizontal' align='center' style={{ justifyContent: 'space-between', width: '100%' }}>
                        <Title level={4}>casa.</Title>
                        {isLoggedIn ? (
                            <AvatarMenu />
                        ) : (
                            <Button style={{color: 'white'}} icon={<LoginOutlined/>}>
                               Login
                            </Button>
                        )}
                    </Space>
                </div>
            </div>
        </>
    )
}

export default Nav