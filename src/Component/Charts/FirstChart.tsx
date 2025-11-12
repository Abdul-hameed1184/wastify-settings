import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type Props = {
    revenue: any[];
}
const FirstChart:React.FC<Props> = ({revenue}) => {
    return (
        <div style={{ width: '100%' }} className='bg-lightBackground px-5 py-3'>
       
            <p className=' font-Poppins text-green text-2xl leading-5 font-semibold m-4'>Monthly sales</p>

            <ResponsiveContainer width="100%" height={412}>
                <AreaChart
                    width={900}
                    height={400}
                    data={revenue}
                    syncId="anyId"
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="billPeriod" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="totalBillAmount" stroke="#96C63D" fill="#96C63D" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default FirstChart