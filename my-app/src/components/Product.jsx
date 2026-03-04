// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import { Link } from "react-router";
// import {useCart} from '../context/CartContext'

// function Product({ id, image, title, price, description, showAddToCart }) {
//     const shortTitle = title.substring(0, 20);
//     const shortdescription = description.substring(0, 150);
//     const { addToCart } = useCart();
//     return (
//         <Card sx={{ maxWidth: 345, m: 5 }}>
//             <CardMedia sx={{ height: 180 }} title={shortTitle} image={image} />
//             <CardContent>
//                 <Typography gutterBottom variant="h5" component="div">
//                     {shortTitle}
//                 </Typography>
//                 <Typography gutterBottom variant="h5" component="div">
//                     ₹{price}
//                 </Typography>
//                 <Typography gutterBottom variant="h5" component="div">
//                     {shortdescription}
//                 </Typography>
//             </CardContent>
//             <CardActions>
//                 {showAddToCart ? (
//                     <Button
//                         onClick={() => addToCart({ id, image, title, price, description })}
//                         variant='contained'
//                         size='small'
//                     >
//                         Add to Cart
//                     </Button>
//                 ) : (
//                     <Button
//                         component={Link}
//                         to={"/product/"+id}
//                         variant='contained'
//                         size='small'
//                     >
//                       show
//                     </Button>
//   )}
//         </CardActions>



//     </Card >
//   );
// }

// export default Product;


//code 2 to ui upgrade
import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Box } from '@mui/material';
import { Link } from "react-router-dom";
import { useCart } from '../context/CartContext'; // Ensure this path matches yours

function Product({ id, image, title, price, description, showAddToCart }) {
    const { addToCart } = useCart();

    // 1. THE PRICE FIX: Properly formats to INR
    const formattedPrice = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    }).format(price);

    return (
        <Card
            sx={{
                height: '100%', // Crucial: Makes all cards in the grid the same height
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '16px', // Modern rounded corners
                border: '1px solid rgba(0,0,0,0.05)', // Clean, subtle border
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)', // Very soft shadow
                transition: 'all 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-6px)', // Lifts up on hover
                    boxShadow: '0 12px 24px rgba(0,0,0,0.1)', // Stronger shadow on hover
                }
            }}
        >
            {/* 2. IMAGE WRAPPER: Adds a clean background and spacing */}
            <Box sx={{ p: 2, backgroundColor: '#fdfdfd', borderBottom: '1px solid rgba(0,0,0,0.03)' }}>
                <CardMedia
                    component="img"
                    sx={{ height: 180, objectFit: 'contain' }}
                    image={image}
                    alt={title}
                />
            </Box>

            {/* 3. CONTENT: flexGrow pushes the buttons to the absolute bottom */}
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1, p: 2.5 }}>

                {/* Modern Title: Uses CSS to limit to exactly 2 lines with "..." */}
                <Typography
                    variant="subtitle1"
                    sx={{
                        fontWeight: 700,
                        lineHeight: 1.3,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        minHeight: '44px' // Keeps height stable even if the title is only 1 line
                    }}
                >
                    {title}
                </Typography>

                {/* Fixed Price */}
                <Typography variant="h6" color="primary" sx={{ fontWeight: 800 }}>
                    {formattedPrice}
                </Typography>

                {/* Modern Description: Smaller text, limited to 2 lines */}
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}
                >
                    {description}
                </Typography>
            </CardContent>

            <CardActions sx={{ p: 2.5, pt: 0 }}>
                {/* 4. MODERN BUTTONS: Full width, sleek borders, bold text */}
                {showAddToCart ? (
                    <Button
                        onClick={() => addToCart({ id, image, title, price, description })}
                        variant='contained'
                        fullWidth
                        disableElevation
                        sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 600, py: 1 }}
                    >
                        Add To Cart
                    </Button>
                ) : (
                    <Button
                        component={Link}
                        to={`/product/${id}`}
                variant='outlined'
                fullWidth
                sx={{
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontWeight: 600,
                    py: 1,
                    borderWidth: '2px',
                    '&:hover': { borderWidth: '2px' } // Prevents border jitter on hover
                }}
          >
                View Details
            </Button>
        )}
        </CardActions>
    </Card >
  );
}

export default Product;