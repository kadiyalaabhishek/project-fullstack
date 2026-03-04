// import React,{Fragment} from 'react';


// const Fotter = () => {
//   return (
//     <h1>Footer</h1>
//   )
// }

// export default Fotter


//code 2 ui degin updated
import React from 'react';
import { Box, Grid, Typography, Container, IconButton, Link as MuiLink } from '@mui/material';
import { GitHub, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Box 
      sx={{ 
        bgcolor: '#0a0a0a', // Ultra-dark sleek background
        color: '#a3a3a3', // Soft gray text for reduced eye strain
        py: { xs: 6, md: 10 }, // Generous padding
        mt: 'auto', // Pushes footer to the bottom if the page is short
        borderTop: '1px solid #222' 
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          
          {/* Column 1: Brand & Tagline */}
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h5" 
              sx={{ 
                color: '#fff', 
                fontWeight: 800, 
                letterSpacing: '-0.5px', 
                mb: 2 
              }}
            >
              NEXAMART.
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.8, mb: 3, maxWidth: '300px' }}>
              Your ultimate destination for premium lifestyle products. 
              Built with React, Material-UI, and modern web standards.
            </Typography>
            
            {/* Social Icons - Great place to link your developer profiles! */}
            <Box sx={{ ml: -1 }}>
              <IconButton href="https://github.com" target="_blank" sx={{ color: '#a3a3a3', '&:hover': { color: '#fff' } }}>
                <GitHub />
              </IconButton>
              <IconButton href="https://linkedin.com" target="_blank" sx={{ color: '#a3a3a3', '&:hover': { color: '#0077b5' } }}>
                <LinkedIn />
              </IconButton>
              <IconButton sx={{ color: '#a3a3a3', '&:hover': { color: '#E1306C' } }}>
                <Instagram />
              </IconButton>
              <IconButton sx={{ color: '#a3a3a3', '&:hover': { color: '#1DA1F2' } }}>
                <Twitter />
              </IconButton>
            </Box>
          </Grid>

          {/* Column 2: Quick Links */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 600, mb: 2 }}>
              Shop
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <MuiLink component={Link} to="/" underline="none" sx={{ color: 'inherit', '&:hover': { color: '#fff' } }}>All Products</MuiLink>
              <MuiLink component={Link} to="/cart" underline="none" sx={{ color: 'inherit', '&:hover': { color: '#fff' } }}>Your Cart</MuiLink>
              <MuiLink underline="none" sx={{ color: 'inherit', '&:hover': { color: '#fff', cursor: 'pointer' } }}>New Arrivals</MuiLink>
              <MuiLink underline="none" sx={{ color: 'inherit', '&:hover': { color: '#fff', cursor: 'pointer' } }}>Discounts</MuiLink>
            </Box>
          </Grid>

          {/* Column 3: Support */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 600, mb: 2 }}>
              Support
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <MuiLink underline="none" sx={{ color: 'inherit', '&:hover': { color: '#fff', cursor: 'pointer' } }}>Help Center</MuiLink>
              <MuiLink underline="none" sx={{ color: 'inherit', '&:hover': { color: '#fff', cursor: 'pointer' } }}>Track Order</MuiLink>
              <MuiLink underline="none" sx={{ color: 'inherit', '&:hover': { color: '#fff', cursor: 'pointer' } }}>Returns</MuiLink>
              <MuiLink underline="none" sx={{ color: 'inherit', '&:hover': { color: '#fff', cursor: 'pointer' } }}>Contact Us</MuiLink>
            </Box>
          </Grid>

        </Grid>
        {/* Bottom Divider & Copyright */}
        <Box 
          sx={{ 
            mt: 8, 
            pt: 3, 
            borderTop: '1px solid #222', 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            justifyContent: 'space-between', 
            alignItems: 'center',
            gap: 2
          }}
        >
          <Typography variant="body2">
            © {new Date().getFullYear()} NexaMart. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Typography variant="body2" sx={{ cursor: 'pointer', '&:hover': { color: '#fff' } }}>Privacy Policy</Typography>
            <Typography variant="body2" sx={{ cursor: 'pointer', '&:hover': { color: '#fff' } }}>Terms of Service</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;