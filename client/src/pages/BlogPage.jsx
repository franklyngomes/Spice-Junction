import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box,
  Avatar,
  Divider,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { fetchBlogs } from "../features/blog/blogSlice";
import "../styles/BlogPage.css";

const testimonials = [
  { name: "Antony Thomez", role: "Client", text: "This prestigious recognition is a testament to our passion for quality, creativity, and dedication to delivering an exceptional culinary experience.", img: "https://randomuser.me/api/portraits/women/1.jpg" },
  { name: "Sophia Williams", role: "Client", text: "Amazing food, great ambiance! Highly recommended for everyone who loves quality dining.", img: "https://randomuser.me/api/portraits/women/2.jpg" },
  { name: "Rahul Sharma", role: "Client", text: "The flavors were outstanding, and the service was impeccable. A five-star experience indeed!", img: "https://randomuser.me/api/portraits/men/3.jpg" },
  { name: "Emily Davis", role: "Client", text: "Absolutely loved the dishes. Perfectly cooked and beautifully presented.", img: "https://randomuser.me/api/portraits/women/4.jpg" },
];

export default function BlogPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogs, loading, error } = useSelector((state) => state.blogs || { blogs: [], loading: false, error: null });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      {/* ===== BLOG TITLE ===== */}
      <Typography variant="h4" align="center" gutterBottom className="blog-title">
        BLOG
      </Typography>

      {/* ===== LOADING & ERROR STATES ===== */}
      {loading && <Typography>Loading blogs...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      {!loading && blogs.length === 0 && <Typography>No blogs found.</Typography>}

      {/* ===== BLOG GRID ===== */}
      <Grid container spacing={2} sx={{ mt: 3 }}>
        {blogs.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item._id} sx={{ display: 'flex' }}>
            <Card
              className="blog-card"
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                cursor: 'pointer'
              }}
              onClick={() => navigate(`/blog/${item._id}`)}
            >
              <CardMedia
                component="img"
                height="200"
                image={item.image}
                alt={item.title}
              />
              <CardContent sx={{ flexGrow: 1 }} className="blog-card-content">
                <Typography variant="h6" gutterBottom>
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.description}
                </Typography>
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  By {item.author.firstName} {item.author.lastName}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ===== DIVIDER ===== */}
      <Divider sx={{ my: 6 }} />

      {/* ===== TESTIMONIALS ===== */}
      <Box className="testimonial-box" sx={{ mt: 4 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTestimonial}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: "center" }}
          >
            <Avatar
              src={testimonials[currentTestimonial].img}
              alt={testimonials[currentTestimonial].name}
              sx={{ width: 80, height: 80, mx: "auto", mb: 2 }}
            />
            <Typography variant="body1" sx={{ mb: 1 }}>
              "{testimonials[currentTestimonial].text}"
            </Typography>
            <Typography variant="subtitle1">
              {testimonials[currentTestimonial].name}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {testimonials[currentTestimonial].role}
            </Typography>
          </motion.div>
        </AnimatePresence>
      </Box>
    </Container>
  );
}
