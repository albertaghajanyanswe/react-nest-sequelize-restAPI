const muiStyles = {
  tableCellItem: {
    wordBreak: 'break-all'
  },
  boldText: {
    fontFamily: 'Poppins',
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: 700,
    color: 'secondary.textColor1',
  },
  paper: {
    background: 'white',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'primary.borderColor1',
    boxShadow: '0px 4px 16px rgba(181, 195, 211, 0.25)',
    borderRadius: '8px',
    '& > ul': {
      p: '4px'
    }
  },
  menuItem: {
    fontFamily: 'Poppins',
    fontSize: '14px',
    fontWeight: 400,
    height: '40px',
    borderRadius: '4px',
    color: 'secondary.textColor1',
    '&:not(:last-child)': {
      mb: '4px'
    }
  },
  actionIcon: {
    '&:hover': {
      '& > svg': {
        '& > path': {
          stroke: '#457BAC'
        }
      }
    },
    '&:active': {
      backgroundColor: '#F1F4FA',
      '& > svg': {
        '& > rect:first-of-type': {
          stroke: '#F1F4FA'
        },
        '& > path': {
          stroke: '#226395'
        }
      }
    },
  },
  modalRoot: {
    '& .MuiPaper-root': {
      p: '32px 80px',
      maxWidth: '476px',
      boxShadow: 'none',
      borderRadius: '24px'
    },
    backdropFilter: "blur(12px)",
    zIndex: 1000,
    //other styles here
  },
  modalTitleRoot: {
    fontFamily: 'Poppins',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '24px',
    color: 'primary.textColor1',
    p: 0,
    mb: 1,
    display: 'flex',
    justifyContent: 'start',
  },
  modalTitle: {
    justifyContent: 'start',
    width: '100%',
    display: 'flex',
    fontFamily: 'Poppins',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '24px',
    color: 'primary.textColor1',
  },
  modalTitleTxt: {
    fontFamily: 'Poppins',
    fontSize: '18px',
    lineHeight: '24px',
    fontWeight: 700,
    color: 'secondary.textColor1',
  },
  modalDescTxt: {
    fontFamily: 'Poppins',
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: 400,
    color: 'secondary.textColor3',
  },
  removeBtn: {
    fontFamily: 'Poppins',
    fontSize: '14px',
    lineHeight: '16px',
    fontWeight: 500,
    minHeight: '32px',
    height: 'auto',
    width: '100%',
    p: '4px 12px',
    backgroundColor: 'primary.error',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'primary.error',
    '&:hover': {
      boxShadow: 'none',
      backgroundColor: 'primary.error',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'primary.error',
      opacity: 0.92
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: 'primary.error',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'primary.error',
      opacity: 1
    },
    '&:disabled': {
      boxShadow: 'none',
      backgroundColor: 'primary.error',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'primary.error',
      opacity: 0.6
    },
  },
  cancelBtn: {
    fontFamily: 'Poppins',
    fontSize: '14px',
    lineHeight: '16px',
    fontWeight: 500,
    minHeight: '32px',
    height: '32px',
    width: '100%',
    p: '8px 12px',
  }
}

export { muiStyles };