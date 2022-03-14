
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

export default function ConfirmDialog(props) {
    console.log(props)
    const { confirmDialog, setConfirmDialog } = props;
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={confirmDialog.isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        <Typography variant="h6">
                       {confirmDialog.title}
                   </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <Typography variant="subtitle">
                    {confirmDialog.subtitle}
                 </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button> */}
          <Button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}> Não </Button>
          <Button onClick={confirmDialog.onConfirm}> Sim</Button>
          {/* <Button onClick={handleClose} autoFocus>
            Agree
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}


   
// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';
// import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
// import Typography from '@mui/material/Typography';

// export default function ConfirmDialog(props) {
//     console.log(props)
//     const { confirmDialog, setConfirmDialog } = props;
//     // const [open, setOpen] = React.useState(false);

  

//     return (
//         <div>
//             <Dialog open={confirmDialog.isOpen} >

//                 <DialogTitle >
//                     <DeleteForeverSharpIcon fontSize='large' />
//                 </DialogTitle>
//                 <DialogContent >
//                     <Typography variant="h6">
//                         {confirmDialog.title}
//                     </Typography>
//                     <Typography variant="subtitle">
//                         {confirmDialog.subtitle}
//                     </Typography>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button
//                         color="default"
//                         onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}> Não
//                     </Button>
//                     <Button onClick={confirmDialog.onConfirm}> Sim
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </div>
//     );
// }