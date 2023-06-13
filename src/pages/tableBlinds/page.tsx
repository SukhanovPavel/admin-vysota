import React from 'react';
import {Button, Space, Table, Tag} from 'antd';
import type { ColumnsType } from 'antd/es/table';
// import {data} from "../../assets/mock";
import {Link} from "react-router-dom";
import {PageLayout} from "../../shared/PageLayout/PageLayout";

const columns: ColumnsType = [
    {
        title: 'Месяц',
        dataIndex: 'month',
        key: 'month',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Дата',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Клиент',
        dataIndex: 'clientName',
        key: 'clientName',
    },
    {
        title: 'Телефон',
        dataIndex: 'phone',
        key: 'phone',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Номер заказа',
        dataIndex: 'number',
        key: 'number',
    },
    {
        title: 'Статус заказа',
        dataIndex: 'status',
        key: 'status',
        render: (_, { status }) => {
            let color = status === "Выполнен" ? 'green' : status === "В работе" ? 'geekblue' : 'volcano';
            return (
                <Tag color={color} key={status}>
                    {status.toUpperCase()}
                </Tag>
            );
        }

    },
    {
        title: 'Цена',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Предоплата',
        dataIndex: 'prePrice',
        key: 'prePrice',
    },
    {
        title: 'Остаток',
        dataIndex: 'debt',
        key: 'debt'
    },
    {
        title: 'Адрес',
        dataIndex: 'address',
        key: 'address',
    },{
        title: 'Замер',
        dataIndex: 'img',
        key: 'img',
        render: (text) => <a>{text}</a>,
    },
];

const ceilingsMap = [];
const clients = ceilingsMap.filter(item => item.productType === "Жалюзи");

export const TableBlindsPage: React.FC = () =>
    <PageLayout columns={columns} data={clients} title="Заказы по жалюзи:" />