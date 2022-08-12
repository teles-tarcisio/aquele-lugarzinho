import React, { useState, useEffect } from 'react';
import {
  Button,
  Stack,
} from '@mui/material';
import * as api from '../../services/api';

export default function CategoryButtons({ token, setFilter }) {
  const [allCategories, setAllCategories] = useState([]);
  useEffect(() => {
    const categoriesPromise = api.getCategories(token);
    categoriesPromise.then((response) => {
      setAllCategories(response.data);
    });
  }, []);

  function handleCategoryFilter(ev) {
    setFilter(ev.target.id);
  }

  return (
    <Stack
      sx={{ pt: 4 }}
      direction="row"
      spacing={4}
      justifyContent="center"
    >
      {allCategories.map((category) => (
        <Button
          key={category.id}
          sx={{ bgcolor: '#388E3c' }}
          variant="contained"
          onClick={handleCategoryFilter}
          id={category.categoryName}
        >
          {category.categoryName}
        </Button>
      ))}
    </Stack>
  );
}
