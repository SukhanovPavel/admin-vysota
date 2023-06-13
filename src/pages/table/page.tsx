import React, {useEffect, useState} from 'react';
import {RootState} from "../../store";
import {Spin} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {addOrder, Order, setClients} from "../../store/slices/clientsSlice";
// import {data} from "../../assets/mock";
import {PageLayout} from "../../shared/PageLayout/PageLayout";
import {hydrateRoot} from "react-dom/client";

export const TablePage = () => {
    // const initialData: Order[] = [...data]

    const dispatch = useDispatch();



    // useEffect(() => {
    //     async function fetchData() {
    //         await dispatch(setClients(initialData));
    //     }
    //         fetchData();
    // }, []);
    // useEffect(() => {
    //     setTimeout(() => {}), 1000;
    // }, [dispatch, orders]);

    // setTimeout(() => dispatch(setClients(initialData)), 1000);
    // clearTimeout(dispatch(setClients(initialData)))

    // console.log(orders);

    return (<PageLayout title="Все заказы:"/>)
}