import React, { useContext } from 'react'
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
import Modal from '../../components/modal/Modal';
import CartItem from '../../components/cartItem/CartItem';

function Cart() {
    const context = useContext(myContext)
    const { mode } = context;

    const cartItems = [
        {
            image: "https://dummyimage.com/400x400",
            title: "This is title",
            description: "desc",
            price: "100"
        }
    ]

    return (
        <Layout>
            <div className="h-screen bg-gray-100 pt-28" style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '', }}>
                <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
                <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                    <div className="rounded-lg md:w-2/3">
                        {cartItems.map((item, index) => (
                            <div key={index} className="justify-between mb-6 rounded-lg border drop-shadow-xl bg-white p-6 sm:flex sm:justify-start"
                                style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '' }}>
                                <CartItem 
                                    {...item} 
                                    mode={mode}
                                    onDelete={() => console.log('Delete item', index)}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '', }}>
                        <div className="mb-2 flex justify-between">
                            <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Subtotal</p>
                            <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹100</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Shipping</p>
                            <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹20</p>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-between mb-3">
                            <p className="text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>Total</p>
                            <div className>
                                <p className="mb-1 text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>₹200</p>
                            </div>
                        </div>
                        <Modal />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Cart