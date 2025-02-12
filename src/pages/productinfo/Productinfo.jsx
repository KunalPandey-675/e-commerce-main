import React from 'react'
import Layout from '../../components/layout/Layout'
import ProductCard from '../../components/productCard/ProductCard'

function ProductInfo() {
    const productData = {
        image: "https://dummyimage.com/400x400",
        brand: "BRAND NAME",
        title: "The Catcher in the Rye",
        description: "Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.",
        price: "58.00"
    }

    return (
        <Layout>
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-32 mx-auto">
                    <ProductCard {...productData} />
                </div>
            </section>
        </Layout>
    )
}

export default ProductInfo