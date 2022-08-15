import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';

export default function ReviewCard({ cardContent }) {
  const [openDetails, setOpenDetails] = useState(false);

  function handleReviewDetails() {
    setOpenDetails(true);
  }

  function handleClose() {
    setOpenDetails(false);
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
        <Dialog open={openDetails} onClose={handleClose}>
          <DialogTitle>{`Lugarzinho: ${cardContent.location.name}`}</DialogTitle>
          <DialogContent>
            <CardMedia
              component="img"
              sx={{
                pt: '5%',
                maxWidth: '85vw',
              }}
              image={cardContent.reviewImageUrl}
              alt="review picture"
            />
            <Typography>
              {cardContent.reviewText}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>fechar</Button>
          </DialogActions>
        </Dialog>
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
