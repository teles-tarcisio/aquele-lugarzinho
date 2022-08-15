import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  TextField,
  Typography,
} from '@mui/material';

export default function ReviewCard({ cardContent }) {
  const navigate = useNavigate();

  function handleReviewDetails() {
    alert('review details');
  }

  return (
    <Card
      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <CardMedia
        component="img"
        sx={{
          pt: '5%',
        }}
        image={cardContent.reviewImageUrl}
        alt="review picture"
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          noWrap
        >
          {cardContent.reviewText}
        </Typography>
      </CardContent>
      <CardActions
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Button
          size="small"
          onClick={handleReviewDetails}
        >
          Detalhes
        </Button>
        <Button>
          <Avatar
            id={`user_${cardContent.userId}_avatar`}
            alt="User Avatar"
            src={cardContent.user.userImageUrl}
          />
        </Button>
      </CardActions>
    </Card>
  );
}
