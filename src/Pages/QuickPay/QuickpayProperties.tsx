import { Link, useLocation } from "react-router-dom";

export const QuickpayProperties = () => {

    return (
        <main className='m-4'>
            <div className="mt-6">
                <div className="flex justify-end mr-3">
                    <Link to="/">   <button className="bg-blue-500 text-white px-4 py-2 rounded">Back</button></Link>
                </div>
            </div>
        </main>
    );
};
