import React from 'react'
import { PieChart, Pie, Cell } from 'recharts';
import { FaCircle } from "react-icons/fa";
import { Paragraph2Green } from '../Paragraph';

const data = [
    { name: 'Overdue Bills', value: 150 },
    { name: 'Current Bills', value: 350 },
];
const COLORS = ['#7ABC0080', '#7ABC00'];
const FirstPieChart = () => {
    return (
        <div style={{ width: '100%' }} className='bg-lightBackground px-2 py-3'>
            <p className=' font-Poppins text-green text-2xl leading-5 font-semibold m-4'>Monthly sales</p>
            <div className="flex w-full">
                <PieChart width={300} height={400} >
                    <Pie
                        data={data}
                        cx={100}
                        cy={30}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>

                </PieChart>
                <div className="">
                    <div className="flex">
                        <FaCircle className='text-green' /> 
                        <Paragraph2Green content={"Current Bills"} />
                    </div>
                    <div className="flex">
                        <FaCircle className='text-[#7ABC0080]' /> 
                        <p className='text-[#7ABC0080] text-base m-2 font-inter font-bold not-italic leading-5'>Overdue Bills</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default FirstPieChart