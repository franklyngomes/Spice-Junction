import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Typography, Card, CardMedia, CardContent } from "@mui/material";
import { fetchBlogDetails } from "../features/blog/blogSlice";

export default function BlogDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { blogDetail, loading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogDetails(id));
  }, [dispatch, id]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!blogDetail) return <Typography>No blog found</Typography>;

  return (
    <Container maxWidth="md" sx={{ py: 10 }}>
      <Card>
        <CardMedia
          component="img"
          height="300"
          image={blogDetail.image}
          alt={blogDetail.title}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {blogDetail.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            By {blogDetail.author.firstName} {blogDetail.author.lastName}
          </Typography>
          <Typography variant="body1">{blogDetail.description}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
