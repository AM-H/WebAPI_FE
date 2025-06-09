'use client';
import { Dialog, Button, DialogTitle, DialogContent, Box, TextField } from '@mui/material';
import { useState } from 'react';

type RatingData = {
  rating_1: number;
  rating_2: number;
  rating_3: number;
  rating_4: number;
  rating_5: number;
};

export default function BookRating({
  onSubmit,
  currentRatings
}: {
  onSubmit?: (ratings: RatingData) => void;
  currentRatings?: {
    rating_1: number;
    rating_2: number;
    rating_3: number;
    rating_4: number;
    rating_5: number;
  };
}) {
  const [open, setOpen] = useState(false);
  const [ratings, setRatings] = useState<{ [key in keyof RatingData]: string | number }>({
    rating_1: 0,
    rating_2: 0,
    rating_3: 0,
    rating_4: 0,
    rating_5: 0
  });

  const handleOpen = () => {
    if (currentRatings) {
      setRatings({
        rating_1: currentRatings.rating_1,
        rating_2: currentRatings.rating_2,
        rating_3: currentRatings.rating_3,
        rating_4: currentRatings.rating_4,
        rating_5: currentRatings.rating_5
      });
    }
    setOpen(true);
  };

  const handleChange = (key: keyof RatingData, value: string) => {
    if (value === '' || /^\d+$/.test(value)) {
      setRatings((prev) => ({ ...prev, [key]: value === '' ? '' : Math.max(0, parseInt(value)) }));
    }
  };

  const handleSubmit = () => {
    if (onSubmit) {
      const formatted = Object.fromEntries(
        Object.entries(ratings).map(([k, v]) => [k, typeof v === 'string' ? parseInt(v) || 0 : v])
      ) as RatingData;
      onSubmit(formatted);
    }
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen}>Update Rating</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Update Rating</DialogTitle>
        <DialogContent>
          {[1, 2, 3, 4, 5].map((n) => {
            const key = `rating_${n}` as keyof RatingData;
            return (
              <Box key={key} sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
                <Box sx={{ width: 140 }}># of {n}-Star Ratings:</Box>
                <TextField
                  type="number"
                  value={ratings[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                  inputProps={{ min: 0 }}
                  sx={{ ml: 1, width: 100 }}
                />
              </Box>
            );
          })}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button variant="outlined" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
