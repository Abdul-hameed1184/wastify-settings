import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'Jan',
        amount: 280,
    
    },
    {
        name: 'Feb',
        amount: 370,
       
    },
    {
        name: 'Mar',
        amount: 350,
    
    },
    {
        name: 'Apr',
        amount: 520,
     
    },
    {
        name: 'May',
        amount: 440,
        
    },
    {
        name: 'Jun',
        amount: 190,
        
    },
    {
        name: 'Jul',
        amount: 500,
       
    },
    {
        name: 'Aug',
        amount: 510,
      
    },

    {
        name: 'Sep',
        amount: 480,
    
    },
    {
        name: 'Oct',
        amount: 510,
       
    },
    {
        name: 'Nov',
        amount: 460,
       
    },
    {
        name: 'Dec',
        amount: 500,
        
    },
];

const FirstChart = () => {
    return (
        <div style={{ width: '100%' }} className='bg-lightBackground px-5 py-3'>
       
            <p className=' font-Poppins text-green text-2xl leading-5 font-semibold m-4'>Monthly sales</p>

            <ResponsiveContainer width="100%" height={412}>
                <AreaChart
                    width={900}
                    height={400}
                    data={data}
                    syncId="anyId"
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="amount" stroke="#96C63D" fill="#96C63D" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default FirstChart