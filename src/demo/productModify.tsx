import React from 'react';
import { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { ProductInputs } from '../types/ProductInputs';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

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
    <Container component="main">
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center">商品変更</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField label="商品名" fullWidth sx={{ my:4 }} defaultValue={location.state.productName}
            {...register('productName', { required: true })} 
          />
          {errors.productName && (
                  <span style={{ color: 'red' }}>This field is required</span>
              )}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="submit" variant="contained">変更</Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default ProductModify;