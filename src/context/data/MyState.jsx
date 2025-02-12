 // Make sure to import useState
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { Timestamp, collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig"; // Adjust the path as necessary
import myContext from "./myContext";

function MyState(props) {
    const { mode, setMode } = useState('light'); // You might want to destructure the useState properly

    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = '#042743';
        } else {
            setMode('light');
            document.body.style.backgroundColor = 'white';
        }
    };
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState({
        title: null,
        price: null,
        imageUrl: null,
        category: null,
        description: null,
        time: Timestamp.now(),
        date: new Date().toLocaleString(
          "en-US",
          {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }
        )
    
      })
    
      // ********************** Add Product Section  **********************
      const closeModal = () => {
          // Add your modal closing logic here
      };
  
      const addProduct = async () => {
        if (products.title == null || products.price == null || products.imageUrl == null || products.category == null || products.description == null) {
          return toast.error('Please fill all fields')
        }
        const productRef = collection(fireDB, "products")
        setLoading(true)
        try {
          await addDoc(productRef, products)
          toast.success("Product Add successfully")
          getProductData()
          closeModal()
          setLoading(false)
        } catch (error) {
          console.log(error)
          setLoading(false)
        }
        setProducts("")
      }
    
      const [product, setProduct] = useState([]);
    
      // ****** get product
      const getProductData = async () => {
        setLoading(true)
        try {
          const q = query(
            collection(fireDB, "products"),
            orderBy("time"),
            // limit(5)
          );
          const data = onSnapshot(q, (QuerySnapshot) => {
            let productsArray = [];
            QuerySnapshot.forEach((doc) => {
              productsArray.push({ ...doc.data(), id: doc.id });
            });
            setProduct(productsArray)
            setLoading(false);
          });
          return () => data;
        } catch (error) {
          console.log(error)
          setLoading(false)
        }
      }
    
      useEffect(() => {
        getProductData();
      }, []);
    
    
    return (
        <myContext.Provider value={{ mode, toggleMode, loading, setLoading, addProduct }}>
            {props.children}
        </myContext.Provider>
    );
}

MyState.propTypes = {
    children: PropTypes.node.isRequired, // Ensures children is passed
};

export default MyState;
