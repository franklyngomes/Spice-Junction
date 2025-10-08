import React from "react";
import { Container, Typography, Grid, Box, CardMedia } from "@mui/material";
import "../styles/PageSection.css";

export default function PageSection() {
  const ingredientImage = "public/image/d6f8e707e7ea18afa821077f19de7b76230e52ae (1).jpg";

  const ingredientImages = [
    "public/image/ingre 1.webp",
    "public/image/ingre2.jpg",
    "public/image/ingre3.jpg",
    "public/image/ingre 4.jpg",
    "public/image/ingre 5.jpg",
    "public/image/ingre7.jpg",
  ];

  return (
    <Container maxWidth="lg" className="pages-container">
     
      <Box textAlign="center" mb={5}>
        <Typography variant="h4" fontWeight="bold">
          PAGES
        </Typography>
        
      </Box>

      
      <Grid container spacing={4} alignItems="stretch" className="section-box">
        <Grid item xs={12} md={6}>
          <CardMedia
            component="img"
            image="public/image/7481b4a61668112ee505e23843c39dc3f41d2fb2.jpg"
            alt="Chef cooking"
            className="left-image"
            sx={{
              width: "100%",
              height: 550, 
              objectFit: "fill",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <Typography variant="h5" className="highlight-text" gutterBottom>
            Delicious Burgers Made from the Freshest Ingredients
          </Typography>
          <Typography variant="body1" className="desc-text">
            Indian cooking is renowned for its use of spices like cumin,
            coriander, turmeric, cardamom, and garam masala. These aren't just
            used for heat, but to build layers of flavor.
          </Typography>
           <Box className="middle-section" sx={{ overflow: "hidden", my: 5, minHeight: 400 }}>
        
        <CardMedia
          component="img"
          image="public/image/2327735f1c1948c2b276f9f7dd48abe5aeda8d56 (1).jpg"
          alt="Food preparation"
          className="middle-image"
          sx={{
            float: "right",
            width: "100%", 
            height: 450,
            objectFit: "fill",
            marginLeft: 2, 
            clear: "both", 
          }}
        />
      </Box>
        </Grid>
      </Grid>

      
      <Box textAlign="center" className="ingredients-title" mb={2}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          INGREDIENTS
        </Typography>
      </Box>

       <Grid container spacing={2} className="ingre">
        {ingredientImages.map((img, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <CardMedia
              component="img"
              image={img}
              alt={`Ingredient ${index + 1}`}
              sx={{
                width: "100%",
                height: 200,
                objectFit: "cover",
                borderRadius: 2,
                boxShadow: 2,
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}