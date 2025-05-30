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
  );
}

        