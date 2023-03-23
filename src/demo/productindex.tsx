import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ProductType } from '../types/ProductType';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';

function ProductIndex() {
  const [posts, setPosts] = useState<ProductType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('http://localhost:8080/products');
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <Container component="main">
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center">商品一覧</Typography>
        {posts.map((post) => (
          <Typography component="h3" variant="h6" align="left" key={post.id}>
            <Link to={`${post.id}`}>
                {post.id}:{post.productName}
            </Link>
          </Typography>
        ))}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={() => navigate('register', {})}>作成</Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default ProductIndex;