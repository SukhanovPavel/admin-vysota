import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {supabase} from "../../lib/api";

export type Order = {
    id: string;
    key: string;
    month: string;
    date: string;
    clientName: string;
    phone: string;
    productType?: string;
    number: string;
    status: string;
    price: string;
    prePrice: string;
    debt: string;
    date1?: string;
    date2?: string;
    date3?: string;
    address: string;
    img?: string;
}

const months = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь",]

// const initialState = [];

const initialState: { orders: Order[], status: string, error: null } = {
    orders: [],
    status: 'idle',
    error: null
};

export const fetchData = createAsyncThunk('clients/fetchData', async (): Order[] => {
    let { data: vysota, error } = await supabase
        .from('vysota')
        .select('*')

    if (error) console.log("error", error);
    return vysota;
})

export const clientsSlice = createSlice({

    name: 'clients',

    initialState,

    reducers: {

        getDebts: (state: Order[], {payload}) => state.map(item =>
            item.id === payload.id && {date1: item.date1, date2: item.date2, date3: item.date3}),

        setClients: ( _, action: PayloadAction<Order[]>) => action.payload,

        addOrder: (state: Order[]) => {
            const newOrder = {
                id: (state.length+1).toString(),
                key: (state.length+1).toString(),
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
            return [newOrder, ...state];
        },

        // editOrder: (state, action) => {
        //     const newData = [...orders];
        //     const index = newData.findIndex((item) => row.key === item.key);
        //     const item = newData[index];
        //     newData.splice(index, 1, {
        //         ...item,
        //         ...row,
        //     });}

    }
})

export const {
    setClients,
    addOrder,
    getDebts,
} = clientsSlice.actions;

export default clientsSlice.reducer;

export const selectAllOrders = state => state.clients;

export const selectPostById = (state, clientId) =>
    state.clients.find(client => client.id === clientId);