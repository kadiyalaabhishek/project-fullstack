import React, { useState, useEffect } from 'react'
import axios from "axios";

import { Box, Grid } from '@mui/material';

// ui design
import {  Typography, CircularProgress } from '@mui/material';

//componet
import Product from "../components/Product"

const HomePage = () => {

    const [products, setProducts] = useState([]);

    // useEffect(() => {
    //     async function  fetchproducts() {
    //         const res = await axios.get('')
    //         console.log(res)
    //         setProducts(res.data);
    //     };
    //     fetchproducts('');
    // }, []);
    // console.log("products =>", products);
    
    useEffect(() => {
    async function fetchproducts() {
      try {
        // PASTE YOUR BACKEND URL HERE INSIDE THE QUOTES
        const res = await axios.get('http://127.0.0.1:8000/products'); 
        
        console.log("Data received:", res.data); // This will show in Console
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchproducts();
  }, []);

  return (
      <Box sx={{width:'80vw',margin:'10px auto'}}>
        {products.length === 0 && <p>Loading Products</p>}
        {products.length && (
            <Box>
                <h1>ALL PRODUCTS</h1>
                  <Grid container>
            {products.map((product) => {
              return (
                <Grid key={product.id} spacing={2} size={{ xs: 12, sm: 12, md: 4, lg: 3 }}>
                  <Product
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    description={product.description}
                    image={product.image}
                  />
                </Grid>
              );
            })}
          </Grid>
            </Box>
        )}
        
      </Box>
  );
};

export default HomePage
