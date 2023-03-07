import React from 'react';
import { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { ProductInputs } from '../types/ProductInputs';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

function ProductModify() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<ProductInputs>();
  const navigate = useNavigate();
  const { productId } = useParams();
  const location = useLocation();
  const [text, setText] = useState(location.state.productName);
  const onSubmit: SubmitHandler<ProductInputs> = (data: any) => {
    const requestOptions ={
      method: 'PUT',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({id: productId, productName: data.productName})
    };
    fetch('http://localhost:8080/product',requestOptions
    ).then((response)=> {
      navigate('/products');
    })
  };
  console.log('watch:', watch('productName')); // watchは引数に渡した名前の入力値を監視する
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>商品変更</h2>
        <div>
          <span>商品名:</span>
          <input defaultValue={location.state.productName} {...register('productName', { required: true })} />
          {errors.productName && (
              <span style={{ color: 'red' }}>This field is required</span>
          )}
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
    </>
  );
}

export default ProductModify;