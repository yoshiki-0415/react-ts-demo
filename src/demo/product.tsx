import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductType } from '../types/ProductType';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';

function Product() {
  const { productId } = useParams();
  const [post, setPost] = useState<ProductType>({id:"", productName:""});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(
        `http://localhost:8080/product/${productId}`
      );
      const data = await res.json();
      setPost(data);
    };
    fetchPost();
  }, [productId]);

  const onClickDelete = () => {
    const requestOptions ={
      method: 'DELETE',
      headers:{'Content-Type': 'application/json'}
    };
    fetch(`http://localhost:8080/product/${productId}`, requestOptions
    ).then((response)=> {
      navigate('/products');
    })
  }
  
  return (
    <Container component="main">
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center">商品詳細</Typography>
        <Typography component="h4" variant="h6">ID:{post.id}</Typography>
        <Typography component="h4" variant="h6">商品名:{post.productName}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap:1}}>
          <Button variant="contained" onClick={() => navigate('edit', { state : {productName:post.productName} })}>変更</Button>
          <Button variant="contained" onClick={onClickDelete}>削除</Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Product;