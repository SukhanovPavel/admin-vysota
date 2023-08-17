import React from 'react';
import { Card, Col, Row } from 'antd';

export const PageWeekLine: React.FC = () => (
    <Row gutter={16}>
        <Col span={6}>
            <Card title="Заголовок" bordered={false}>
                Контент
            </Card>
        </Col>
        <Col span={6}>
            <Card title="Заголовок" bordered={false}>
                Контент
            </Card>
        </Col>
        <Col span={6}>
            <Card title="Заголовок" bordered={false}>
                Контент
            </Card>
        </Col>
        <Col span={6}>
            <Card title="Заголовок" bordered={false}>
                Контент
            </Card>
        </Col>
    </Row>
);