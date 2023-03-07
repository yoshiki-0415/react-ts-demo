import React from 'react';
import { ProductInputs } from '../types/ProductInputs';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

function ProductRegister() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<ProductInputs>();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<ProductInputs> = (data: any) => {
    const requestOptions ={
      method: 'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({productName: data.productName})
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
        <h2>商品登録</h2>
        <div>
          <span>商品名:</span>
          <input {...register('productName', { required: true })} />
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

export default ProductRegister;