import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Breakpoint, styled } from '@mui/material/styles';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface IAlertDialogSlide {
  isOpen: boolean;
  size?: false | Breakpoint;
  actionChild?: React.ReactNode;
  contentChild?: React.ReactNode;
  transitionProps?: TransitionProps;
  cancelButton?: React.ReactNode;
  okButton?: React.ReactNode;
  onChange: (isOpen: boolean) => void;
  onCancel: (event) => void;
  onConfirm: (event) => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const AlertDialogSlide: React.FC<IAlertDialogSlide> = (props: IAlertDialogSlide) => {
  const {
    isOpen,
    actionChild,
    contentChild,
    onChange,
    onConfirm,
    onCancel,
    size,
    transitionProps,
  } = props;
  const [open, setOpen] = useState(isOpen ?? false);

  const handleClose = (event) => {
    setOpen(false);
    onChange(false);
    if (onCancel) {
      onCancel(event);
    }
  };
  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        disableScrollLock
        onClose={handleClose}
        classes={{
          paper: 'tw-rounded-[20px] tw-overflow-visible',
          root: 'font-family: Lexend Deca',
        }}
        {...transitionProps}
        maxWidth={size}
      >
        <DialogTitle>{contentChild}</DialogTitle>

        <DialogActions>{actionChild}</DialogActions>
        <div className="tw-absolute  -tw-right-[15px] -tw-top-[15px] tw-w-[48px] tw-h-[48px] tw-bg-transparent tw-rounded-full">
          <Button
            onClick={handleClose}
            className="!tw-min-w-[1px] tw-h-full tw-w-full tw-p-0 tw-m-0 tw-bg-transparent tw-rounded-full"
          >
            <Image src="/images/icons/close-modal.svg" layout="fill" />
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default AlertDialogSlide;
