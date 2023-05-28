import { Avatar, Dropdown, Navbar, Text } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import { DarkModeSwitch } from './darkmodeswitch';
import { api } from '@/pages/api/appwrite';
import router from 'next/router';
import {ConfigurationModal} from '../modal/configurations-modal';

interface User {
    user: string,
    blocked: boolean,
    blockedCount: number,
    isLibrarian: boolean,
    name: string,
    approved: boolean,
    photoURL?: string,
}

export const BookerDropdown = () => {
    const [acc, setAcc]:any = useState(null);
    const [user, setUser] = useState<User | null>(null);
    const [configModalVisible, setConfigModalVisible] = useState(false);

    useEffect(() => {
        api.getUserData().then(result => {
            console.log(result)
            setUser(result)
        });
        api.getCurrentUser().then(result => setAcc(result));
    }, []);

    const handleLogout = async () => {
        await api.userLogout();
        router.push("/")
    };

    return (
        <div>
        <ConfigurationModal visible={configModalVisible} setVisible={setConfigModalVisible} />
        <Dropdown placement="bottom-right">
            <Navbar.Item>
                <Dropdown.Trigger>
                    <Avatar
                        bordered
                        as="button"
                        color="secondary"
                        size="md"
                        src={user?.photoURL || "https://i.pravatar.cc/150?u=a042581f4e29026704d"}
                    />
                </Dropdown.Trigger>
            </Navbar.Item>
            <Dropdown.Menu
                aria-label="User menu actions"
                onAction={(actionKey) => {
                    if (actionKey === 'logout') {
                        handleLogout();
                    }else if (actionKey === 'configurations') {
                        setConfigModalVisible(true);
                    }
                }}
            >
                <Dropdown.Item key="profile" css={{ height: '$18' }}>
                    <Text b color="inherit" css={{ d: 'flex' }}>
                        Logado como:
                    </Text>
                    <Text b color="inherit" css={{ d: 'flex' }}>
                        {acc?.email || 'Loading...'}
                    </Text>
                </Dropdown.Item>
                <Dropdown.Item key="configurations" > Configurations </Dropdown.Item>
                <Dropdown.Item key="help_and_feedback" withDivider>
                    Help & Feedback
                </Dropdown.Item>
                <Dropdown.Item key="logout" withDivider color="error">
                    Log Out
                </Dropdown.Item>
                <Dropdown.Item key="switch" withDivider>
                    <DarkModeSwitch />
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        </div>
    );
};
