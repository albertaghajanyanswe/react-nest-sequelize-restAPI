import { useTheme } from '@mui/system';
import React from 'react';
import CustomButton from '../customButton';
import { muiStylesWithTheme } from './styles';

const CustomSnackbarAction = ({ actions = [], data }: { actions?: { label: string, onClick: (data: any) => void }[], data?: any }) => {
  const theme = useTheme();
  const muiStyles = muiStylesWithTheme(theme);
  return (
    <>
      {actions.map((i, index) => {
        return (
          <CustomButton
            label={i.label}
            variant='contained'
            btnType='ghost'
            size='small'
            onClick={() => i.onClick(data)}
            sx={{ ...muiStyles.smallBtn, width: '100%', padding: '8px 8px', whiteSpace: 'nowrap' }}
            key={index}
          />
        )
      })}
    </>
  )
}

export default CustomSnackbarAction;