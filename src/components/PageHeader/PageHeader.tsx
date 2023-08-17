import React, {useState} from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';

const optionsWithDisabled = [
    { label: 'Сегодня', value: 'today' },
    { label: 'Завтра', value: 'tomorrow' },
    { label: 'Календарь', value: 'calendar' },
];

export const PageHeader = () => {

    const [value4, setValue4] = useState('Apple');

    const onChange4 = ({ target: { value } }: RadioChangeEvent) => {
        console.log('radio4 checked', value);
        setValue4(value);
    };

    return (
        <div>
            {/*<Radio.Group*/}
            {/*    options={optionsWithDisabled}*/}
            {/*    onChange={onChange4}*/}
            {/*    value={value4}*/}
            {/*    optionType="button"*/}
            {/*    buttonStyle="solid"*/}
            {/*/>*/}
            <Radio.Group defaultValue="a" buttonStyle="solid">
                <Radio.Button value="a">Сегодня</Radio.Button>
                <Radio.Button value="b">Завтра</Radio.Button>
                <Radio.Button value="c">Календарь</Radio.Button>
            </Radio.Group>
        </div>
    );
};