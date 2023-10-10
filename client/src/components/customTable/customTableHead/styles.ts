const muiStyles = {
  tableHeadRow: {
    backgroundColor: 'primary.lightBG1',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'primary.borderColor2',
    height: '48px',
    '& > th': {
      fontFamily: 'Poppins',
      fontSize: 12,
      lineHeight: '16px',
      fontWeight: '500',
      color: 'primary.textColor3',
    }
  },
  sortLbl: {
    // todo disable rotate sort icon
    // transform: 'none',
    // '& > svg': {
    //   transform: 'none',
    // }
    // todo always show sort icon
    '& > .MuiTableSortLabel-icon': {
      opacity: 0.6,
      color: 'primary.textColor6'
    }
  }
};
export { muiStyles };