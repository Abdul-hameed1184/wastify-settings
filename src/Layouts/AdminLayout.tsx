import React from 'react'
import PropTypes from "prop-types";
import AdminNavbar from './AdminNavbar'
import AdminSidebar from './AdminSidebar'

const AdminLayout = ({ children }) => {
    return (
        <div>
            <AdminNavbar />
            <div className="flex">
                <div className="w-full mt-10 lg:w-1/5 lg:mt-5">
                    <AdminSidebar />
                </div>
                <div className="w-full lg:w-4/5 mt-28 lg:mx-10">
                    <main>{children}</main>
                </div>
            </div>

        </div>
    )
}

AdminLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AdminLayout