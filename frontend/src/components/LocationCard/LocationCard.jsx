import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

export default function LocationCard({ cardContent }) {
  const navigate = useNavigate();
  function handleAddReview() {
    alert(`adicionar review do local ${cardContent.id}`);
  }

  return (
    <Card
      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      onClick={handleAddReview}
    >
      <CardMedia
        component="img"
        sx={{
          // 16:9
          pt: '5%',
        }}
        image={cardContent.locationImageUrl}
        alt="location picture"
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography>
          {cardContent.name}
        </Typography>
        <Typography>
          {cardContent.address}
        </Typography>
      </CardContent>
    </Card>
  );
}
