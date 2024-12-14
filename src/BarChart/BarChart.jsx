import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer
} from "recharts"
import styles from "./BarChart.module.css"
const BarChartComponent = ({data}) => {
    return <div className={styles.barchart}>
        <h2>Top Expenses</h2>
        <div className={styles.barcontainer}>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} layout="vertical">
                    <XAxis type="number" axisLine={false} display="none"/>
                    <YAxis type="category" width={100} dataKey="name" axisLine={false}/>
                    <Bar dataKey="value" fill="#8884d8" barSize={25}/>
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
}
export default BarChartComponent