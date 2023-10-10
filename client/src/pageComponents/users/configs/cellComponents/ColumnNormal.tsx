import React, { FC } from 'react';
import { TableCell, Typography, Box } from '@mui/material';

import { muiStyles } from './styles';
import { getCellPadding } from '../../../../components/customTable/config/tableStyleHelper';

interface iProps {
  data: any;
  cellItem: any;
  isSortedCeil: boolean;
}
const ColumnStatus: FC<iProps> = (props) => {
  const { data, cellItem: { cellPaddingRight, cellPaddingLeft, textAlign, id }, isSortedCeil } = props;

  return (
    <TableCell
      align={textAlign || "left"}
      sx={muiStyles.tableCellItem}
      style={getCellPadding(cellPaddingRight, cellPaddingLeft)}
      // onClick={(e) => { e.stopPropagation(); }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography sx={muiStyles.boldText}>{data[id]}</Typography>
      </Box>
    </TableCell>
  )
}

export default ColumnStatus;