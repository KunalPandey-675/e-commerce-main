import React from 'react'

function OrderCard({ mode, orderNumber, status, date, total, shipping, onViewDetails }) {
    return (
        <>
            <div className="flex flex-wrap justify-between mb-4">
                <h2 className="tracking-widest text-xl title-font font-medium mb-1" style={{ color: mode === 'dark' ? 'white' : '' }}>
                    Order #{orderNumber}
                </h2>
                <span className={`${status === 'Delivered' ? 'text-green-600' : 'text-blue-600'} font-semibold`}>
                    {status}
                </span>
            </div>
            
            <div className="mb-4">
                <div className="flex justify-between py-2 border-b">
                    <span>Date</span>
                    <span>{date}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                    <span>Total</span>
                    <span>₹ {total}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                    <span>Shipping</span>
                    <span>{shipping}</span>
                </div>
            </div>

            <div className="flex justify-center">
                <button 
                    onClick={onViewDetails}
                    className={`focus:outline-none text-white ${status === 'Delivered' ? 'bg-green-600' : 'bg-blue-600'} hover:bg-pink-500 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full py-2`}>
                    View Details
                </button>
            </div>
        </>
    )
}

export default OrderCard
