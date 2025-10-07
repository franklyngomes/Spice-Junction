// import React from 'react'
// import { AppBar, Toolbar, Typography, Box, IconButton, Button } from '@mui/material'
// import { Link } from 'react-router-dom'
// import AccountCircleIcon from '@mui/icons-material/AccountCircle'
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
// import MenuIcon from '@mui/icons-material/Menu'
// import '../styles/Navbar.css'

// export default function Navbar() {
//   return (
//     <AppBar position="absolute" elevation={0} className="navbar">
//       <Toolbar className="navbar-toolbar">
//         {/* Logo */}
//         <Typography variant="h6" className="navbar-logo" component={Link} to="/">
//           Spice Junction
//         </Typography>

//         {/* Center Links */}
//         <Box className="navbar-links">
//           <Button component={Link} to="/" className="nav-link active">HOME</Button>
//           <Button component={Link} to="/menu" className="nav-link">OUR MENU</Button>
//           <Button component={Link} to="/pages" className="nav-link">PAGES</Button>
//           <Button component={Link} to="/blog" className="nav-link">BLOG</Button>
//         </Box>

//         {/* Right icons */}
//         <Box className="navbar-icons">
//           <IconButton><AccountCircleIcon /></IconButton>
//           <IconButton><ShoppingCartIcon /></IconButton>
//           <IconButton><MenuIcon /></IconButton>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   )
// }


import React, { useEffect, useState } from 'react'
import { AppBar, Toolbar, Typography, Box, IconButton, Button } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'   // ⬅️ add useLocation
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import MenuIcon from '@mui/icons-material/Menu'
import '../styles/Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()                    // ⬅️ current route

  useEffect(() => {
    const isHome = pathname === '/'

    const onScroll = () => {
      // turn white either after scroll on Home OR always on non-home
      setScrolled(!isHome || window.scrollY > 20)
    }

    onScroll() // run once on mount/route change
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  return (
    <AppBar
      position="fixed"                // sticky
      elevation={0}
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
    >
      <Toolbar className="navbar-toolbar">
        {/* Logo */}
        <Typography variant="h6" className="navbar-logo" component={Link} to="/">
          Spice Junction
        </Typography>

        {/* Center Links */}
        <Box className="navbar-links">
          <Button component={Link} to="/" className="nav-link active">HOME</Button>
          <Button component={Link} to="/menu" className="nav-link">OUR MENU</Button>
          <Button component={Link} to="/pages" className="nav-link">PAGES</Button>
          <Button component={Link} to="/blog" className="nav-link">BLOG</Button>
        </Box>

        {/* Right icons */}
        <Box className="navbar-icons">
          <IconButton><AccountCircleIcon /></IconButton>
          <IconButton><ShoppingCartIcon /></IconButton>
          <IconButton><MenuIcon /></IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
