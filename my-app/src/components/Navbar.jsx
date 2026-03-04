// import React from "react";
// import { Box, AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";
// // ONLY use this one for icons:
// import { Menu as MenuIcon } from "@mui/icons-material"; 
// import { Link } from "react-router";

// const Navbar = () => {
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="fixed">
//         <Toolbar>
//           <IconButton 
//           size="large"
//           edge="start"
//           color="inherit"
//           aria-label="menu"
//           sx={{mr:2}}
//           >
//              <MenuIcon /> 
//           </IconButton>
//           <Typography 
//           variant="h6" 
//           component={Link}
//            to="/"
//            sx={{flexGrow:1, textDecoration:'none',color:'inherit',cursor:'pointer'}}
//            >Home</Typography>
//           <Button component={Link} to="/cart" color="inherit">Cart</Button>
//           <Button component={Link} to="/login" color="inherit">Login</Button>
//           {/* ... the rest of your JSX ... */}
//         </Toolbar>
//       </AppBar>
//     </Box>
//   ); 
// };   

// export default Navbar; 


// code 2 update navbar featuerts and look
import React from "react";
import { Box, AppBar, Toolbar, Typography, IconButton, Button, Badge } from "@mui/material";
// Added ShoppingCart and Person icons for a better UI
import { Menu as MenuIcon, ShoppingCart as ShoppingCartIcon, Person as PersonIcon } from "@mui/icons-material";
import { Link } from "react-router-dom"; // Ensure this matches your routing library

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="fixed"
        sx={{
          // 1. Modern Glassmorphism effect instead of solid blue
          background: "rgba(255, 255, 255, 0.85)", 
          backdropFilter: "blur(12px)", 
          // 2. Very subtle shadow instead of a harsh drop shadow
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.03)", 
          borderBottom: "1px solid rgba(0,0,0,0.05)",
          color: "#111", // Dark text for high contrast on the light background
          px: { xs: 1, md: 3 } // Adds a bit more horizontal breathing room
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          
          {/* LEFT SIDE: Menu Icon & Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>

            {/* Modernized Logo Typography */}
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                flexGrow: 1,
                textDecoration: 'none',
                color: 'inherit',
                fontWeight: 800, // Extra bold for brand identity
                letterSpacing: '-0.5px', // Tighter letter spacing looks more premium
                textTransform: 'uppercase'
              }}
            >
              NexaMart.
            </Typography>
          </Box>

          {/* RIGHT SIDE: Action Buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            
            {/* Login as a sleek button with an icon */}
            <Button 
              component={Link} 
              to="/login" 
              color="inherit"
              startIcon={<PersonIcon />}
              sx={{ 
                textTransform: 'none', // Disables default ALL CAPS MUI buttons
                fontWeight: 600,
                borderRadius: '8px',
                '&:hover': { background: 'rgba(0,0,0,0.04)' }
              }}
            >
              Login
            </Button>

            {/* Cart Icon with a Notification Badge */}
            <IconButton 
              component={Link} 
              to="/cart" 
              color="inherit"
              sx={{ ml: 1 }}
            >
              <Badge badgeContent={2} color="primary" // The badge makes it look like a real app!
                sx={{
                  '& .MuiBadge-badge': {
                    fontWeight: 'bold',
                    boxShadow: '0 0 0 2px white', // White ring around the badge
                  }
                }}
              > 
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;

