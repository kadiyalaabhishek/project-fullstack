// //2 code
// import React from 'react';
// import { useCart } from '../context/CartContext'; 
// import { Box, Typography, Button, Grid, Paper } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import axios from  from 'axios';

// const Cart = () => {
//   // 1. Get the 'removeFromCart' function
//   const { cart, removeFromCart } = useCart(); 
//   const navigate = useNavigate();

//   // Calculate Total
//   const totalPrice = cart.reduce((total, item) => total + Number(item.price), 0);

//   if (cart.length === 0) {
//     return (
//       <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
//         <Typography variant="h5" gutterBottom>Your Cart is Empty</Typography>
//         <Button variant="contained" onClick={() => navigate('/')}>
//           Go Shopping
//         </Button>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ padding: '30px', maxWidth: '1000px', margin: 'auto' }}>
//       <Typography variant="h4" gutterBottom>Shopping Cart ({cart.length} items)</Typography>
      
//       <Grid container spacing={3}>
        
//         {/* LEFT SIDE: Cart Items */}
//         <Grid item xs={12} md={8}>
//           {cart.map((item, index) => (
//             <Paper key={index} elevation={2} sx={{ display: 'flex', padding: '15px', marginBottom: '15px', alignItems: 'center' }}>
//               <img 
//                 src={item.image} 
//                 alt={item.title} 
//                 style={{ width: '80px', height: '80px', objectFit: 'contain', marginRight: '20px' }} 
//               />
              
//               <Box sx={{ flexGrow: 1 }}>
//                 <Typography variant="h6">{item.title}</Typography>
//                 <Typography variant="body2" color="text.secondary">Category: {item.category}</Typography>
                
//                 {/* 2. THE REMOVE BUTTON */}
//                 <Button 
//                   size="small" 
//                   color="error" 
//                   onClick={() => removeFromCart(item.id)}
//                   sx={{ marginTop: '10px' }}
//                 >
//                   Remove
//                 </Button>
//               </Box>

//               <Typography variant="h6" color="primary">₹{item.price}</Typography>
//             </Paper>
//           ))}
//         </Grid>

//         {/* RIGHT SIDE: Checkout Box */}
//         <Grid item xs={12} md={4}>
//           <Paper elevation={3} sx={{ padding: '20px', position: 'sticky', top: '20px' }}>
//             <Typography variant="h6" gutterBottom>Order Summary</Typography>
//             <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '10px 0' }} />
            
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
//               <Typography variant="h5">Total:</Typography>
//               <Typography variant="h5" color="primary" fontWeight="bold">
//                 ₹{totalPrice.toFixed(2)}
//               </Typography>
//             </Box>

//             <Button variant="contained" size="large" fullWidth color="success">
//               Proceed to Checkout
//             </Button>
//           </Paper>
//         </Grid>

//       </Grid>
//     </Box>
//   );
// };

// export default Cart;


//code 3

import React from 'react';
import { useCart } from '../context/CartContext';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  // 1. Get cart data from your Context
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  // 2. Calculate Total Price safely
  const totalPrice = cart.reduce((total, item) => total + Number(item.price), 0);

  // 3. The Payment Logic (Razorpay)
  const handleCheckout = async () => {
    try {
      // Step A: Create Order on Backend
      const { data } = await axios.post("http://127.0.0.1:8000/create-order", {
        amount: totalPrice 
      });

      // Step B: Configure Razorpay Popup
      const options = {
        key: "rzp_test_SKjarDZMBtinyq", // 🔴 PASTE YOUR KEY ID HERE
        amount: data.amount,
        currency: "INR",
        name: "My E-Commerce App",
        description: "Test Transaction",
        order_id: data.id, // Order ID from backend
        
        handler: async function (response) {
          // Step C: Verify Payment
          const verifyData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };

          try {
            await axios.post("http://127.0.0.1:8000/verify-payment", verifyData);
            alert("Payment Successful! Order Placed.");
            // You can add clearCart() here later
            navigate('/'); // Redirect to Home
          } catch (error) {
            alert("Payment verification failed");
          }
        },
        theme: { color: "#3399cc" }
      };

      // Step D: Open the Popup
      const rzp1 = new window.Razorpay(options);
      rzp1.open();

    } catch (error) {
      console.error("Payment failed:", error);
      alert("Something went wrong. Is your backend running?");
    }
  };

  // 4. Handle Empty Cart
  if (cart.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
        <Typography variant="h5" gutterBottom>Your Cart is Empty</Typography>
        <Button variant="contained" onClick={() => navigate('/')}>
          Go Shopping
        </Button>
      </Box>
    );
  }

  // 5. Main UI
  return (
    <Box sx={{ padding: '30px', maxWidth: '1000px', margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>Shopping Cart ({cart.length} items)</Typography>

      <Grid container spacing={3}>
        {/* LEFT SIDE: Cart Items */}
        <Grid item xs={12} md={8}>
          {cart.map((item, index) => (
            <Paper key={index} elevation={2} sx={{ display: 'flex', padding: '15px', marginBottom: '15px', alignItems: 'center' }}>
              <img 
                src={item.image} 
                alt={item.title} 
                style={{ width: '80px', height: '80px', objectFit: 'contain', marginRight: '20px' }} 
              />
              
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body2" color="text.secondary">Category: {item.category}</Typography>
                
                <Button 
                  size="small" 
                  color="error" 
                  onClick={() => removeFromCart(item.id)}
                  sx={{ marginTop: '10px' }}
                >
                  REMOVE
                </Button>
              </Box>

              <Typography variant="h6" color="primary">₹{item.price}</Typography>
            </Paper>
          ))}
        </Grid>

        {/* RIGHT SIDE: Checkout Box */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: '20px', position: 'sticky', top: '20px' }}>
            <Typography variant="h6" gutterBottom>Order Summary</Typography>
            <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '10px 0' }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <Typography variant="h5">Total:</Typography>
              <Typography variant="h5" color="primary" fontWeight="bold">
                ₹{totalPrice.toFixed(2)}
              </Typography>
            </Box>

            <Button 
              onClick={handleCheckout} 
              variant="contained" 
              size="large" 
              fullWidth 
              color="success"
            >
              PROCEED TO CHECKOUT
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Cart;