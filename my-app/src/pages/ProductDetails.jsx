// // import React,{useState,useEffect, Fragment} from 'react';
// // import { useParams } from 'react-router';
// // import axios from 'axios';
// // import Product from '../components/Product';

// // const ProductDetails = () => {
// //     const{productId}= useParams();
// //     const [product, setProduct] = useState(null);
// //     useEffect(() => {
// //       async function fetchProductById() {
// //         try {

// //         }
// //         const res= await axios.get('http://127.0.0.1:8000/product/${productId}');
// //         setProduct(res.data);
// //       } catch (error) {
// //         console.error
// //         ("error fetching");
// //       }

// //       fetchProductById();
// //     }, [productId]);
// //     console.log(product);
// //   return (
// //     <Fragment>
// //       {product && <Product
// //         id={product.id}
// //         title={product.title}
// //         price={product.price}
// //         description={product.description}
// //         image={product.image} />}
// //     </Fragment>
// //   )
// // }

// // export default ProductDetails

// //2nd code
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { Box, Typography, Button, Grid, Paper } from '@mui/material';

// const ProductDetails = () => {
//   const { productId } = useParams();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     async function fetchProductById() {
//       try {
//         // FIX: I used BACKTICKS (  ) here. Notice they look slightly different.
//         const res = await axios.get(`http://127.0.0.1:8000/product/${productId}`);
//         setProduct(res.data);
//       } catch (error) {
//         console.error("Error fetching product:", error);
//       }
//     }
//     fetchProductById();
//   }, [productId]);

//   if (!product) return <h2 style={{textAlign: 'center', marginTop: '20px'}}>Loading...</h2>;

//   return (
//     <Box sx={{ padding: '30px' }}>
//       <Paper elevation={3} sx={{ padding: '20px', maxWidth: '900px', margin: 'auto' }}>
//         <Grid container spacing={4}>
//           <Grid item xs={12} md={6}>
//             <img 
//               src={product.image} 
//               alt={product.title} 
//               style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }} 
//             />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <Typography variant="h4" gutterBottom>{product.title}</Typography>
//             <Typography variant="h5" color="primary" sx={{ my: 2 }}>${product.price}</Typography>
//             <Typography paragraph>{product.description}</Typography>
//             <Button variant="contained" size="large" sx={{ mt: 2 }}>
//               Add to Cart
//             </Button>
//           </Grid>
//         </Grid>
//       </Paper>
//     </Box>
//   );
// };

// export default ProductDetails;




//3rd code
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';

// 1. Import the hook from your Context file
import { useCart } from '../context/CartContext'; 

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  
  // 2. Get the "addToCart" function from the Context
  const { addToCart } = useCart(); 

  useEffect(() => {
    async function fetchProductById() {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/product/${productId}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }
    fetchProductById();
  }, [productId]);

  if (!product) return <h2>Loading...</h2>;

  return (
    <Box sx={{ padding: '30px' }}>
      <Paper elevation={3} sx={{ padding: '20px', maxWidth: '900px', margin: 'auto' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <img 
              src={product.image} 
              alt={product.title} 
              style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }} 
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4">{product.title}</Typography>
            <Typography variant="h5" color="primary" sx={{ my: 2 }}>₹{product.price}</Typography>
            <Typography paragraph>{product.description}</Typography>
            
            {/* 3. Connect the Button to the function */}
            <Button 
              variant="contained" 
              size="large" 
              onClick={() => {
                addToCart(product); // <--- This sends data to CartContext.jsx
                alert("Item added to cart!"); // Optional: Feedback for the user
              }}
            >
              Add to Cart
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ProductDetails;