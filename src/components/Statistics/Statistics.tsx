import css from './Statistics.module.css'
import { BsArrowUpShort } from 'react-icons/bs'
import { groupNumber } from '../../data'
import StatisticsChart from '../StatisticsChart/StatisticsChart'


const Statistics = () => {
    return (
        <div className={`${css.container} theme-container`}>
            <span className={css.title}>Обзор статистики</span>

            <div className={`${css.cards} grey-container`}>

                <div>
                    <div className={css.arrowIcon}>
                        <BsArrowUpShort />
                    </div>

                    <div className={css.card}>
                        <span>Главный товар этого месяца</span><span>Офисные компьютеры</span>
                    </div>
                </div>

                <div className={css.card}>
                    <span>Количество</span><span> {groupNumber(455)}</span>
                </div>

                <div className={css.card}>
                    <span>Прибыль</span><span>₽ {groupNumber(370000)}</span>
                </div>

                <div className={css.card}>
                    <span>Среднесуточный показатель</span><span>₽ {groupNumber(2000)}</span>
                </div>
            </div>


            <StatisticsChart/>
        </div>
    )
}

export default Statistics