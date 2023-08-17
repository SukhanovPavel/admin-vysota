import React from 'react';
import {AppLayout} from "../../shared/Layout/AppLayout";
import {PageHeader} from "../../components/PageHeader/PageHeader";
import {PageWeekLine} from "../../components/PageWeekLine/PageWeekLine";

export const HomePage = () => {
    return (
        <AppLayout>
            <PageHeader />
            <PageWeekLine />
        </AppLayout>
    );
};