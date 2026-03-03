import { PieChart, Pie, Cell, PieLabelRenderProps, Sector } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';

import { Naira } from '../../utils/format';
import { FaSquare } from "react-icons/fa";

const COLORS = ['#ff0000', '#7ABC00'];

// const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: PieLabelRenderProps) => {
//   if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
//     return null;
//   }
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const ncx = Number(cx);
//   const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
//   const ncy = Number(cy);
//   const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

//   return (
//     <text x={x} y={y} fill="white" textAnchor={x > ncx ? 'start' : 'end'} dominantBaseline="central">
//       {`${((percent ?? 1) * 100).toFixed(0)}%`}
//     </text>
//   );
// };



const FirstPieChart = ({ revenue, overdue }: { revenue: string, overdue: string }) => {
    const data = [
        { name: 'Overdue Bills', value: parseFloat(overdue) || 0 },
        { name: 'Current Bills', value: parseFloat(revenue) || 0 },
    ];

    return (
        <div style={{ width: '100%' }} className='px-2 py-1 flex flex-col gap-1 border border-2 border-gray-200 rounded-md'>
            <p className=' text-xl leading-5 font-normal text-gray-500'>Bill Status</p>
            <div className="flex flex-row items-center w-full m-0 p-0">
                <PieChart width={200} height={200} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <Pie
                        data={data}
                        fill="#8884d8"
                        dataKey="value"
                        outerRadius={80}
                    >
                        {data.map((entry, index) => (

                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>

                </PieChart>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col  items-center text-secondary">
                        <div className='flex flex-row items-center gap-2'>
                        <FaSquare className='text-green ' size={20} />
                                                    <p className='text-gray-500 text-sm md:text-xl font-medium leading-5'>Current Bills</p>
                        </div>
                        <div className="mx-2">

                            <p className='text-black text-lg md:text-2xl font-bold'>{Naira.format(parseFloat(revenue) || 0)}</p>
                        </div>
                    </div>
                    <hr className='border-1 border-gray-200' />
                    <div className="flex flex-col items-center text-secondary">
                        <div className='flex flex-row items-center gap-2'>
                        <FaSquare className='text-red-900' size={20} />
                                                    <p className='text-gray-500 text-sm md:text-xl font-medium leading-5'>Overdue Bills</p>
                        </div>
                        <div className="mx-2">

                            <p className='text-black text-lg md:text-2xl font-bold'>{Naira.format(parseFloat(overdue) || 0)}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default FirstPieChart