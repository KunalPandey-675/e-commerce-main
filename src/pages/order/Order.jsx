import React, { useContext } from 'react'
import Layout from "../../components/layout/Layout"
import myContext from "../../context/data/myContext";
import OrderCard from '../../components/orderCard/OrderCard';

function Order() {
    const context = useContext(myContext)
    const { mode } = context

    const orders = [
        {
            orderNumber: "2024001",
            status: "Processing",
            date: "March 27, 2024",
            total: "500",
            shipping: "123 Main Street, City"
        },
        {
            orderNumber: "2024002",
            status: "Delivered",
            date: "March 25, 2024",
            total: "750",
            shipping: "456 Park Avenue, City"
        }
    ]

    return (
        <Layout>
            <div className="container px-5 py-8 md:py-16 mx-auto">
                <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>
                        Your Orders
                    </h1>
                    <div className="h-1 w-20 bg-pink-600 rounded"></div>
                </div>

                <div className="flex flex-wrap -m-4">
                    {orders.map((order, index) => (
                        <div key={index} className="p-4 md:w-full drop-shadow-lg">
                            <div className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out border-gray-200 border-opacity-60 rounded-2xl overflow-hidden"
                                style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}>
                                <div className="p-5 border-t-2">
                                    <OrderCard 
                                        {...order} 
                                        mode={mode}
                                        onViewDetails={() => console.log('View details', order.orderNumber)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default Order
