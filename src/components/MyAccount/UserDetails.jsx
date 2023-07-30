import React from 'react';
import { Card, Avatar, Typography } from 'antd';
import { getFromLocalStorage } from "../../hooks/useLocalStorage";


const { Title, Text } = Typography;

const UserDetails = () => {
    let user = JSON.parse(getFromLocalStorage("loggedInUser"));
    if(!user) {
        return <Spin className="flex h-full w-full flex-col items-center justify-around" />
    }
    if (user)
        return (
            <Card>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <Avatar size={64} src={user.photoURL} />
                    <div style={{ marginLeft: 16 }}>
                        <Title level={4}>{user.name}</Title>
                        <Text>Email: {user.email}</Text>
                    </div>
                </div>
            </Card>
        );
};

export { UserDetails };