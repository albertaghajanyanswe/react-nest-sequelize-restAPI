import React, { FC } from 'react';
import { TableCell, Typography, Box, IconButton, Grid } from '@mui/material';
import RemoveSvg from '../../../../../src/assets/16/delete.svg';
import { useSnackbar } from 'notistack';
import { getMessage } from '../../../../helpers/helper';
import { muiStyles } from './styles';
import SystemMessage from '../../../../components/systemMessage';
import { useTranslation } from 'react-i18next';
import CustomSnackbarAction from '../../../../components/customSnackbarAction';
import { useModal } from '../../../../hooks/common/useModal';
import { getCellPadding } from '../../../../components/customTable/config/tableStyleHelper';
import CustomModal from '../../../../components/modal/CustomModal';
import CustomButton from '../../../../components/customButton';
import { useTheme } from '@mui/system';

interface iProps {
  data: any;
  cellItem: any;
  isSortedCeil: boolean;
}
const ColumnActions: FC<iProps> = (props) => {
  const { t } = useTranslation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, cellItem: { cellPaddingRight, cellPaddingLeft, textAlign }, isSortedCeil } = props;

  const { enqueueSnackbar } = useSnackbar();
  const {isOpen, openModal, closeModal} = useModal(false);
  const theme = useTheme();
  const handleDelete = () => {
    try {
      (closeModal as () => void)();
      // eslint-disable-next-line no-template-curly-in-string
      SystemMessage(enqueueSnackbar, t('systemMsg.userRemoved').replace('${0}', data.name),
        {
          variant: 'success',
          action: (key) => (
            <>
              {CustomSnackbarAction({
                data: {...data},
                actions: [{label: t('actions.recoverDeletedItem'), onClick: (data: any) => {console.log('Recover a member - ', data)}}]
                })
              }
            </>
          )
        }
      )
    } catch (error: any) {
      SystemMessage(enqueueSnackbar, getMessage(error), { variant: 'error', theme });
    }
    return true
  };

  return (
    <TableCell
      align={textAlign || "left"}
      sx={muiStyles.tableCellItem}
      style={getCellPadding(cellPaddingRight, cellPaddingLeft)}
      onClick={(e) => { e.stopPropagation(); }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton sx={muiStyles.actionIcon} aria-label="search" color="primary" onClick={openModal as () => void}>
          <RemoveSvg />
        </IconButton>
        {isOpen && <CustomModal
          open={isOpen}
          handleClose={closeModal}
          withFooterAction={false}
          withCloseButton={false}
          withDividers={false}
          sxTitleRoot={muiStyles.modalTitleRoot}
          sxTitle={muiStyles.modalTitle}
          sx={muiStyles.modalRoot}
          closeBtnStyle='secondary'
        >
          <Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 1 }}>
              <Typography sx={{ ...muiStyles.modalTitleTxt, textAlign: 'center' }}>{t('deleteUserModal.title1')}</Typography>
              <Typography sx={{ ...muiStyles.modalTitleTxt, textAlign: 'center' }}>{t('deleteUserModal.title2').replace('{0}', 'First Last')}</Typography>
            </Box>
            <Typography sx={{ ...muiStyles.modalDescTxt, textAlign: 'center', mb: 3 }}>{t('deleteUserModal.desc').replace('{0}', 'First')}</Typography>
            <Grid container columnSpacing={2}>
              <Grid item xs={12} sm={6}>
                <CustomButton
                  label={t('actions.remove')}
                  btnType='primary'
                  sx={muiStyles.removeBtn}
                  onClick={handleDelete}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomButton
                  label={t('actions.cancel')}
                  btnType='secondary'
                  sx={muiStyles.cancelBtn}
                  onClick={closeModal}
                />
              </Grid>
            </Grid>
          </Box>

        </CustomModal>}
      </Box>
    </TableCell>
  )
}

export default ColumnActions;