import React, { useState } from 'react'
import { Button, Layout, Menu, Space } from 'antd';
import { Typography } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import { getFromLocalStorage } from '../hooks/useLocalStorage';
import { Link, useLocation } from 'react-router-dom';
import AvatarMenu from './CustomAvatar';
const { Title } = Typography;

const Nav = () => {
    const isLoggedIn = getFromLocalStorage("isLoggedIn");

    let location = useLocation();
    const stylesForSolidNav = {
        marginTop: 0,
        backgroundColor: "rgb(0 21 41)"
    }

    const stylesForUncenteringNav = {
        maxWidth: "none"
    }

    const [active, setActive] = useState(false);
    React.useEffect(() => {
        let stylesActive = location.pathname !== "/"? true:false;
        setActive(stylesActive);
    }, [location]);

    return (
        <>
            <div className="nav-wrapper" style={active?stylesForSolidNav:null}>
                <div className="nav-centering-wrapper" style={active?stylesForUncenteringNav:null}>
                    <Space direction='horizontal' align='center' style={{ justifyContent: 'space-between', width: '100%' }}>
                        <Link to="/"> <Title level={4}>casa.</Title></Link>
                        {isLoggedIn ? (
                            <AvatarMenu />
                        ) : (
                            <Link to="/login">
                            <Button style={{ color: 'white' }} icon={<LoginOutlined />} >
                                Login
                            </Button>
                            </Link>
                        )}
                    </Space>
                </div>
            </div>
        </>
    )
}

export default Nav