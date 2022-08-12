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

export default function ReviewCard({ cardContent }) {
  const navigate = useNavigate();
  function handleAvatarClick(ev) {
    navigate(`/user-reviews/${ev.target.id}`);
  }

  return (
    <Card
      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <CardMedia
        component="img"
        sx={{
          // 16:9
          pt: '5%',
        }}
        image="https://source.unsplash.com/random"
        alt="random"
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography>
          {cardContent.reviewText}
        </Typography>
      </CardContent>
      <CardActions
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Button size="small">Detalhes</Button>
        <Button onClick={handleAvatarClick}>
          <Avatar
            id={cardContent.reviewerId}
            alt="User Avatar"
            src=""
          />
        </Button>
      </CardActions>
    </Card>
  );
}
