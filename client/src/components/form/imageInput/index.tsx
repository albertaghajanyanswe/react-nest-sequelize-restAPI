import React, { useState, useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { FieldValues, useController, useFormContext } from 'react-hook-form';
import { Box, CircularProgress, Typography, Tooltip, IconButton, Avatar } from '@mui/material';
import { ReactComponent as InputError } from '../../../assets/form/input-error.svg';
import { ReactComponent as CleanSvg } from '../../../assets/form/clean.svg';
import { useSnackbar } from 'notistack';

import { muiStylesWithTheme } from './styles';
import { useTheme } from '@mui/system';
import { TypedPath } from '../../../configs/shared/typeUtils';
import { FileData } from '../../../configs/shared/types';
import SystemMessage from '../../systemMessage';
import { getMessage } from '../../../helpers/helper';
import CustomButton from '../../customButton';
import { useTranslation } from 'react-i18next';
import fileService from '../../../services/fileService';
import { uploadsAPI } from '../../../services/rtk/UploadsApi';
import uploadService from '../../../services/uploadService';

const Loading = ({ size = 24 }: { size?: number }) => {
  return (
    <Box sx={{ display: 'flex', minWidth: `${size}px`, minHeight: `${size}px`, padding: '0' }}><CircularProgress size={size} /></Box>
  )
}

const LOADING_GIF = 'https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif';

const FormFileInput = <T extends FieldValues>({
  name,
  rules,
  label,
  description = '',
  disabled,
  setDisableSave,
  acceptFiles = ['.jpeg', '.jpg', '.png', '.gif'],
  sx = {},
  rootSx = {},
  labelSx = {},
  btnType = 'primary',
  alt = '',
}: {
  name: TypedPath<T, FileData[]>;
  rules?: any;
  title?: string;
  helperTooltip?: string;
  label?: string | React.ReactNode;
  description?: string;
  disabled?: boolean,
  setDisableSave?: (val: boolean) => void;
  acceptFiles?: string[],
  sx?: any;
  rootSx?: any;
  labelSx?: any;
  btnType?: 'secondary' | 'primary' | 'tertiary' | 'ghost';
  alt?: string;
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const muiStyles = muiStylesWithTheme(theme);
  const { clearErrors } = useFormContext();

  const { field: { onChange, value }, fieldState: { error } } = useController<T>({ rules, name });
  const { enqueueSnackbar } = useSnackbar();
  const [initialFile, setInitialFile] = useState<string>(value as string || '');
  const [previewFile, setPreviewFile] = useState(initialFile ? fileService.getFileUrl(initialFile || value) : '');
  const ALLOWED_MAX_SIZE = 10000000; // 10 MB

  const [uploadAvatar, { isLoading }] = uploadsAPI.useUploadAvatarMutation();
  const [deleteAvatar, { isLoading: isLoadingDelete }] = uploadsAPI.useDeleteAvatarMutation();

  useEffect(() => {
    setInitialFile(value);
    setPreviewFile(value);
  }, [value]);

  const disableSave = (value: boolean) => {
    if (setDisableSave) {
      setDisableSave(value);
    }
  }

  const createFileApi = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await uploadAvatar({ formData });
    console.log('res = ', res)
    if ('data' in res) {
      clearErrors(name);
      onChange(res.data.filename, { shouldDirty: true });
      setInitialFile(res.data.filename);
    }
  }

  const onFileUpload = async (file: File) => {
    if (!file) return;
    if (file.size > ALLOWED_MAX_SIZE) {
      SystemMessage(enqueueSnackbar, t('errors.fileSizeLimit'), { variant: 'error', theme });
      return;
    }
    disableSave(true);
    setPreviewFile(URL.createObjectURL(file));
    try {
      await createFileApi(file);
    } catch (error: any) {
      SystemMessage(enqueueSnackbar, getMessage(error), { variant: 'error', theme });
    } finally {
      disableSave(false);
    }
  }

  const dropzoneOptions = {
    useFsAccessApi: false,
    onDrop: (acceptedFiles: any) => {
      return onFileUpload(acceptedFiles[0]);
    },
    accept: {
      'image/jpeg': acceptFiles,
      'image/jpg': acceptFiles,
      'image/png': acceptFiles,
      'image/gif': acceptFiles,
    },
    noClick: true
  };

  const { getRootProps, getInputProps, open } = useDropzone(dropzoneOptions);

  const onDelete = async () => {
    await deleteAvatar({filename: initialFile});
    setPreviewFile('');
    onChange('');
  };

  const attachSVGStyle = btnType === 'primary' ? {} : muiStyles.attachBtnStyle;
  const imagePath = (uuid: string) => uuid ? fileService.getFileUrl(uuid) : '';

  return (
    <Box sx={{ ...muiStyles.container, ...sx }} display="flex" flexDirection="column">
      <Box sx={{ ...muiStyles.root, ...rootSx, ...(error && muiStyles.rootError) }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: {xs: 'center', sm: 'center', md: 'center', lg: 'inherit'}, flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'row'} }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row', md: 'row', lg: 'row'} }}>
              <Avatar alt={alt} src={isLoading ? LOADING_GIF : imagePath(initialFile) || previewFile} sx={{ mr: 2, width: 72, height: 72 }} />
              <Box component="div" sx={{ display: 'flex', flexDirection: 'column' }}>
                {label ? typeof label === 'string' ? <Typography sx={{ ...muiStyles.label, ...labelSx }}>{label}</Typography> : label : null}
                {description && <Typography sx={muiStyles.description}>{description}</Typography>}
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', margin: {xs: '24px 0', sm: '24px 0', md: '24px 0', lg: '0'} }}>
            {initialFile && <IconButton onClick={onDelete} sx={{ height: '32px', width: '32px', mr: '12px', '& > svg': { '& > path': { stroke: '#004B7F' } } }}>
              <CleanSvg />
            </IconButton>}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box {...(!disabled && getRootProps())} >
                <CustomButton
                  label={t('actions.uploadNewImage')}
                  variant='contained'
                  btnType='primary'
                  size="small"
                  sx={{ ...muiStyles.attachBtn, ...attachSVGStyle }}
                  onClick={open}
                />
                <input {...getInputProps()} multiple name={name} />
              </Box>
            </Box>
          </Box>

        </Box>
        {Boolean(error?.message) && <Tooltip title={error?.message as string}>
          <Box sx={{ display: 'flex', cursor: 'pointer', ml: 2 }}>
            <InputError />
          </Box>
        </Tooltip>}
      </Box>
    </Box>
  );
}

export default FormFileInput;