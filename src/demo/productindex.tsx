import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ProductType } from '../types/ProductType';

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
    <>
        <h2>商品一覧</h2>
        <ul>
        {posts.map((post) => (
            <li key={post.id}>
            <Link to={`${post.id}`}>
                {post.id}:{post.productName}
            </Link>
            </li>
        ))}
        </ul>
        <div><button onClick={() => navigate('register', {})}>作成</button></div>
    </>
  );
}

export default ProductIndex;