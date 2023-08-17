import React, { useState } from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import {Link} from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Информационная панель', '1',<Link to={'/'}> <PieChartOutlined /></Link>),
    getItem('Замеры', '2',<Link to={'/'}> <PieChartOutlined /></Link>),
    getItem('Заказы', '3', <Link to={'/all'}> <PieChartOutlined /> </Link>),
    getItem('Клиенты', '4',<Link to={'/'}> <PieChartOutlined /></Link>),
    getItem('Монтажи потолки', '5',<Link to={'/'}> <DesktopOutlined /></Link>),
    getItem('Монтажи окна', '6',<Link to={'/'}> <DesktopOutlined /></Link>),
    getItem('Рекламации', '7',<Link to={'/'}> <UserOutlined /></Link>),
    getItem('Мой календарь', '8',<Link to={'/'}> <TeamOutlined /></Link>),
    getItem('Задачи', '9',<Link to={'/'}> <FileOutlined /></Link>),
    getItem('Сотрудники', '10',<Link to={'/'}> <TeamOutlined /></Link>),
    getItem('Дилеры', '11',<Link to={'/'}> <TeamOutlined /></Link>),
];

type Props = {
    children: React.ReactNode;
}

export const AppLayout: React.FC = ({children}: Props) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer, textAlign: 'center'  }}>
                    data for header
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    {children}
                </Content>
                <Footer style={{ textAlign: 'center' }}>data for footer</Footer>
            </Layout>
        </Layout>
    );
};