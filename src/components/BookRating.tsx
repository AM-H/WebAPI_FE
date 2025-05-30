<<<<<<< HEAD
import { Dialog, Button, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';

import { useState } from 'react';

export default function BookRating() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button onClick={handleOpen}>Update rating</Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="Update Review" aria-describedby="Set up a new review">
        <DialogTitle>Update Rating</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter amount of 1 star ratings:</DialogContentText>
          <TextField autoFocus required margin="dense" id="name" name="rating1" label="0" type="number" fullWidth variant="standard" />
          <DialogContentText>Enter amount of 2 star ratings:</DialogContentText>
          <TextField autoFocus required margin="dense" id="name" name="rating2" label="0" type="number" fullWidth variant="standard" />
          <DialogContentText>Enter amount of 3 star ratings:</DialogContentText>
          <TextField autoFocus required margin="dense" id="name" name="rating3" label="0" type="number" fullWidth variant="standard" />
          <DialogContentText>Enter amount of 4 star ratings:</DialogContentText>
          <TextField autoFocus required margin="dense" id="name" name="rating4" label="0" type="number" fullWidth variant="standard" />
          <DialogContentText>Enter amount of 5 star ratings:</DialogContentText>
          <TextField autoFocus required margin="dense" id="name" name="rating5" label="0" type="number" fullWidth variant="standard" />
          <Button onClick={handleClose}>Enter</Button>
        </DialogContent>
      </Dialog>
    </>
=======
import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

export default function BookRating({ average }: { average: number }) {
  const [value, setValue] = React.useState<number | null>(average);
  const [hover, setHover] = React.useState(-1);

  return (
    <Box sx={{ width: 200, display: 'flex', alignItems: 'center' }}>
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{hover !== -1 ? hover : value.toFixed(1)}</Box>
      )}
    </Box>
>>>>>>> origin/main
  );
}
