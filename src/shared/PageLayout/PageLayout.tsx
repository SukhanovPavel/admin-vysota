import React, { useContext, useEffect, useRef, useState } from 'react';
import type { InputRef } from 'antd';
import {Button, Form, Input, Popconfirm, Select, Space, Spin, Table, Tag} from 'antd';
import type { FormInstance } from 'antd/es/form';
import {Order, addOrder, setClients} from "../../store/slices/clientsSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {createClient} from "@supabase/supabase-js";

import {supabase} from "../../lib/api";


const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface EditableRowProps {
    index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    children: React.ReactNode;
    dataIndex: keyof Order;
    record: Order;
    handleSave: (record: Order) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
                                                       title,
                                                       editable,
                                                       children,
                                                       dataIndex,
                                                       record,
                                                       handleSave,
                                                       ...restProps
                                                   }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<InputRef>(null);
    const form = useContext(EditableContext)!;

    useEffect(() => {
        if (editing) {
            dataIndex === "productType" || "status" ? null : inputRef.current!.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();

            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    const productOpt = [
        { value: 'Потолки', label: 'Потолки' },
        { value: 'Окна', label: 'Окна' },
        { value: 'Жалюзи', label: 'Жалюзи' },
        {value: 'м/с', label: 'м/с'},
        {value:'другое', label: 'другое'}
    ];
    const statusOpt = [
        { value: 'Новый', label: 'Новый' },
        { value: 'В работе', label: 'В работе' },
        { value: 'Выполнен', label: 'Выполнен' },
        { value: 'Отменен', label: 'Отменен' },
    ];

    const editCell = dataIndex === "productType" ?
        <Select
            onChange={save}
            options={productOpt}
            defaultOpen
        /> :
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{ margin: 0 }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                {dataIndex === "status" ?
                    <Select
                        onChange={save}
                        options={statusOpt}
                        defaultOpen
                    /> : editCell}
            </Form.Item>
        ) : (
            <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
    id: string;
    key: React.Key;
    month: string;
    date: string;
    clientName: string;
    phone: string;
    productType?: string;
    number: string;
    price: string;
    prePrice: string;
    debt: string;
    address: string;
    img?: string;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

export const PageLayout: React.FC = ({title}) => {

    // const supabase = getStaticProps().then(res => res);

    const dispatch = useDispatch();

    const initialColumns = [
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
            editable: true,
            render: (text) => <div >{text}</div>
        },
        {
            title: 'Клиент',
            dataIndex: 'clientName',
            key: 'clientName',
            editable: true,
            render: (text) => <div style={{padding: "0.3rem 0.7rem"}}>{text ? text : "Имя"}</div>
        },
        {
            title: 'Телефон',
            dataIndex: 'phone',
            key: 'phone',
            editable: true,
            render: (text) => <div style={{paddingLeft: "0.7rem"}}>{text ? text : "Телефон"}</div>
        },
        {
            title: 'Товар',
            dataIndex: 'productType',
            key: 'productType',
            editable: true,
        },
        {
            title: 'Номер заказа',
            dataIndex: 'number',
            key: 'number',
            editable: true,
            render: (text) => <div style={{paddingLeft: "0.7rem"}}>{text ? text : "Номер"}</div>
        },
        {
            title: 'Статус заказа',
            dataIndex: 'status',
            key: 'status',
            editable: true,
            render: (_, { status } ) => {
                let color = status === "Выполнен"
                    ? 'green' : status === "В работе"
                        ? 'geekblue' : status === 'Новый' ? 'yellow' : 'volcano';
                return (
                    <Tag color={color} key={status}>
                        {
                            // status ?
                            status?.toUpperCase()
                            // : 'Новый'
                        }
                    </Tag>
                )
            }

        },
        {
            title: 'Цена',
            dataIndex: 'price',
            key: 'price',
            editable: true,
            render: (text) => <div style={{paddingLeft: "0.7rem"}}>{text ? text : "Цена"}</div>
        },
        {
            title: 'Предоплата',
            dataIndex: 'prePrice',
            key: 'prePrice',
            editable: true,
            render: (text) => <div style={{paddingLeft: "0.7rem"}}>{text ? text : "Предоплата"}</div>
        },
        {
            title: 'Остаток',
            dataIndex: 'debt',
            key: 'debt',
            render: (_, {price, prePrice}) =>
                <>{price === 'Цена' || prePrice === "Предоплата" ? "Остаток" : +price - +prePrice}</>
        },
        {
            title: 'Адрес',
            dataIndex: 'address',
            key: 'address',
            editable: true,
            render: (text) => <div style={{padding: "0.3rem 0.7rem"}}>{text ? text : "Адрес"}</div>
        },
        {
            title: 'Замер',
            dataIndex: 'img',
            key: 'img',
            render: (text) => <a>{text}</a>,
        },
    ];

    // const handleDelete = (key: React.Key) => {
    //     const newData = dataSource.filter((item) => item.key !== key);
    //     setDataSource(newData);
    // };

    const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
            ...initialColumns,
        // {
        //     title: 'operation',
        //     dataIndex: 'operation',
        //     render: (_, record: { key: React.Key }) =>
        //         dataSource.length >= 1 ? (
        //             <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
        //                 <a>Delete</a>
        //             </Popconfirm>
        //         ) : null,
        // },
    ];


    const orders: Order[] = useSelector((state: RootState) => state.clients);
    const [count, setCount] = useState<number>(null);

    const months = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь",]
    const handleAdd = () => {
        const newData = {
            id: count,
            // key: count.toString(),
            month: months[new Date(Date.now()).getMonth()],
            date: new Date(Date.now()).getDate()+"."+(+new Date(Date.now()).getMonth()+1)+"."+new Date(Date.now()).getFullYear(),
            clientName: "",
            phone: "",
            productType: "Потолки",
            number: "",
            status: "Новый",
            price: "",
            prePrice: "",
            debt: "0",
            address: "",
            img: "Замер"
        };
        dispatch(addOrder(newData));
        setCount(count + 1)
        // setData(orders);
        // setDataSource([newData, ...dataSource]);
        addData(newData);

    };


    const handleSave = async (row: Order) => {
        const newData = [...orders];
        // const dataForIndex = [...newData]
        const index = newData.findIndex((item) => row.id === item.key);
        console.log(row)
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        const { data: order, error } = await supabase
            .from('vysota')
            .update(
                {
                    id: newData[index].id,
                    month: newData[index].month,
                    date: newData[index].date,
                    clientName: newData[index].clientName,
                    phone: newData[index].phone,
                    productType: newData[index].productType,
                    number: newData[index].number,
                    status: newData[index].status,
                    price: newData[index].price,
                    prePrice: newData[index].prePrice,
                    debt: newData[index].debt,
                    address: newData[index].address,
                    img: newData[index].img,
                }
            ).eq('id', newData[index].id)

        if (error) console.log("error", error);
        else console.log(`Data ${order} updated successfully`);

        await dispatch(setClients(newData));
    };

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: DataType) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });

    const [data, setData] = useState([]);

    const fetchData = async () => {
        let { data: vysota, error } = await supabase
            .from('vysota')
            .select('*')

        if (error) console.log("error", error);
        // else return vysota;
        // else setData(vysota);
        return vysota;
    };
    const addData = async (newData) => {
        const { data, error } = await supabase
            .from('vysota')
            .insert( newData)
        // let { data: vysota } = await supabase
        //     .from('vysota')
        //     .select('id')

        if (error) console.log("error", error);
        else console.log(`Data ${data} added successfully`);
    };


    // const updateData = async (updData, ind) => {
    //     const { data: order, error } = await supabase
    //         .from('vysota')
    //         .update(updData)
    //         .eq('id', ind)
    //         // .select('*');
    //
    //
    //     if (error) console.log("error", error);
    //     else console.log(`Data ${order} updated successfully`);
    // }

    useEffect(() => {
        async function getResult() {
            const result = await fetchData();
            setCount(result.at(-1).id + 1)
            dispatch(setClients(result.map(item => ({
                id: item.id,
                key: item.id,
                month: item.month,
                date: item.date,
                clientName: item.clientName,
                phone: item.phone,
                productType: item.productType,
                number: item.number,
                status: item.status,
                price: item.price,
                prePrice: item.prePrice,
                debt: item.debt,
                address: item.address,
                img: item.img,
            })).reverse()
            ));
        }

        getResult();
    }, []);


    return (
            orders.length ? <Table
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={orders}
                // dataSource={dbdata}
                columns={columns as ColumnTypes}
                title={() =>
                    <>
                        <h1>{title}</h1>
                        <Space>
                            <Space.Compact>
                                <Button onClick={() => setData(orders)}
                                    // type={path === "/all" ? "primary" : undefined}
                                >Все заказы</Button>
                                <Button onClick={() =>
                                    setData(orders.filter(item => item.productType === 'Потолки'))}
                                >Потолки</Button>
                                <Button onClick={() =>
                                    setData(orders.filter(item => item.productType === 'Окна'))}
                                >Окна</Button>
                                <Button onClick={() =>
                                    setData(orders.filter(item => item.productType === 'Жалюзи'))}
                                >Жалюзи</Button>
                                <Button onClick={() =>
                                    setData(orders.filter(item => item.productType === 'м/с'))}
                                >М/с</Button>
                                <Button onClick={() =>
                                    setData(orders.filter(item => item.productType === 'другое'))}
                                >Другое</Button>
                                <Button onClick={() =>
                                    setData(orders.filter(item => item.productType === 'Комплект.'))}
                                >Комплект</Button>
                            </Space.Compact>
                            <Button onClick={handleAdd} type="primary">Новый заказ</Button>
                        </Space>
                    </>}
            /> :
                <div
                    style={{
                        width: "100%",
                        height: "100vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"}}
                >
                    <Spin size="large"/>
                </div>
    );
};