import React, {useEffect, useState} from 'react';
import {RootState} from "../../store";
import {Spin} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {addOrder, Order, setClients} from "../../store/slices/clientsSlice";
// import {data} from "../../assets/mock";
import {PageLayout} from "../../shared/PageLayout/PageLayout";
import {hydrateRoot} from "react-dom/client";
import {AppLayout} from "../../shared/Layout/AppLayout";

export const TablePage = () => (<AppLayout><PageLayout title="Все заказы:"/></AppLayout>)