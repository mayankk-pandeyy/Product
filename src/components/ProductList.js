import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductList = (props) => {

    const singleProduct = props.singleProduct;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchData(){
    await axios.get('http://35.154.132.235:5000/admin/product/products')
      .then(response => {
        console.log(response.data.result.products); 
        
          setProducts(response.data.result.products);
        
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  } 


  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate();

  function productHandler(product){
    singleProduct(product);
    navigate('/product');
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
        <h1 className='text-xl font-bold'>Product List</h1>
        <div className='w-[100vw] flex flex-wrap gap-10 mt-8'>
            {products.map((product, index) => {
            return <div key={index} className='items-center'>
                <div className='w-[200px] h-[150px] bg-slate-700 overflow-hidden' onClick={()=>productHandler(product)}>
                    <img src={product.productImage} width={200} height={200} className='w-[200px] h-[150px] object-cover'/>
                </div>
                <div className='text-lg font-medium'>{product.brand}</div>
            </div>
            })}
        </div>
    </div>
  );
};

export default ProductList;