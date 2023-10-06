import { createTheme, PaletteOptions, SimplePaletteColorOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  // eslint-disable-next-line no-unused-vars
  interface SimplePaletteColorOptions {
    error?: string;
    warning?: string;
    success?: string;
    info?: string;
    blue1?: string;
    blue2?: string;
    blue3?: string;
    blue4?: string;
    blue5?: string;
    blue6?: string;
    grey1?: string;
    grey2?: string;
    grey3?: string;
    grey4?: string;
    red1: string;
    red2: string;
    red3: string;
    red4: string;
    red5: string;
    red6: string;
    green1: string;
    green2: string;
    green3: string;
    orange1: string;
    orange2: string;
    orange3: string;
  }

  // eslint-disable-next-line no-unused-vars
  interface PaletteColor {
    error?: string;
    warning?: string;
    success?: string;
    info?: string;
    blue1?: string;
    blue2?: string;
    blue3?: string;
    blue4?: string;
    blue5?: string;
    blue6?: string;
    grey1?: string;
    grey2?: string;
    grey3?: string;
    grey4?: string;
    red1: string;
    red2: string;
    red3: string;
    red4: string;
    red5: string;
    red6: string;
    green1: string;
    green2: string;
    green3: string;
    orange1: string;
    orange2: string;
    orange3: string;
  }
}

interface DefaultPaletteOptions extends PaletteOptions {
  primary?: SimplePaletteColorOptions;
  secondary?: SimplePaletteColorOptions;
}

const Default = (): DefaultPaletteOptions => {
  return {
    primary: {
      main: '#E5AF6C',
      error: '#f44336',
      warning: '##ffcf40',
      success: '#00ff2a',
      info: '#096C7C',
      blue1: '#FAFBFD',
      blue2: '#DFE8F3',
      blue3: '#CFE3F2',
      blue4: '#457BAC',
      blue5: '#226395',
      blue6: '#004B7F',
      grey1: '#F1F4FA',
      grey2: '#B4B4B4',
      grey3: '#878787',
      grey4: '#1D1D1D',
      red1: '#FEF1F3',
      red2: '#F7D9DE',
      red3: '#d16374',
      red4: '#d16d7c',
      red5: '#D04C60',
      red6: '#cb394f',
      green1: '#EEFEF9',
      green2: '#B3E7D7',
      green3: '#009E6E',
      orange1: '#FFFAF3',
      orange2: '#FCECD9',
      orange3: '#DA9C50',
    },
    secondary: {
      main: '#E5AF6C',
      error: '#f44336',
      warning: '##ffcf40',
      success: '#00ff2a',
      info: '#096C7C',
      blue1: '#FAFBFD',
      blue2: '#DFE8F3',
      blue3: '#CFE3F2',
      blue4: '#457BAC',
      blue5: '#226395',
      blue6: '#004B7F',
      grey1: '#F1F4FA',
      grey2: '#B4B4B4',
      grey3: '#878787',
      grey4: '#1D1D1D',
      red1: '#FEF1F3',
      red2: '#F7D9DE',
      red3: '#d16374',
      red4: '#d16d7c',
      red5: '#D04C60',
      red6: '#cb394f',
      green1: '#EEFEF9',
      green2: '#B3E7D7',
      green3: '#009E6E',
      orange1: '#FFFAF3',
      orange2: '#FCECD9',
      orange3: '#DA9C50',
    },
  };
};

const defaultColors = Default();
const palette: PaletteOptions = {
  mode: 'dark',
  ...defaultColors,
};

// Note: example how to customize default theme values
// Default theme
const theme = createTheme({
  palette,
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1200,
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          // fontFamily: 'Poppins',
        }
      }
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          '&.themeDatePickerForLabel': {
            '& label': {
              marginTop: '4px'
            }
          },
          '&.themeDatePickerForLabelReverse': {
            '& label': {
              marginLeft: '36px'
            }
          }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          // fontFamily: 'Poppins',
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          border: '1px solid #E0E0E0;',
        },
        input: {
          '&::placeholder': {
            color: '#878787',
            opacity: 1,
            // fontFamily: 'Poppins',
          },
        },

        root: {
          '& .MuiInputBase-inputSizeSmall': {
            padding: '12.5px 16px'
          },
          '& .MuiInputBase-sizeSmall': {
            padding: '12.5px 16px'
          },
          // fontFamily: 'Poppins',
          '&:hover': {
            '& .MuiOutlinedInput-notchedOutline': {
              border: '1px solid #6EA3C9'
            },
          },
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              border: '1px solid #004B7F',
              boxShadow: '0px 0px 0px 3px rgba(0, 75, 127, 0.1)'
            },
          },
          '&.Mui-error': {
            '& .MuiOutlinedInput-notchedOutline': {
              border: '1px solid #C62840',
            },
            '&.Mui-focused': {
              '& .MuiOutlinedInput-notchedOutline': {
                boxShadow: '0px 0px 0px 2px rgba(198, 40, 64, 0.1)'
              },
            },
          },

        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          // borderRadius: '4px 4px 0 0'
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&.themeDrawerMenuItem': {
            '&:hover': {
              '& a, p': {
                color: '#2176B1',
              },
              backgroundColor: 'inherit',
            },
            '&:active': {
              backgroundColor: 'inherit',
              '& a, p': {
                color: '#002E4E',
              },
            },
          },
          '&.themeDrawerActiveMenuItem': {
            '&:hover': {
              '& a, p': {
                color: '#004B7F',
              },
            },
          },
        }
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          background: '#FFFFFF',
          borderRadius: '2px',
          fontSize: '14px',
          lineHeight: '24px',
          fontWeight: 400,
          // fontFamily: 'Poppins',
          '& .MuiMenuItem-root': {
            '&:hover': {
              backgroundColor: '#F3FAFF',
            },
          },
          '& .MuiButtonBase-root.MuiMenuItem-root.Mui-selected': {
            '& .themeShowInSelected': {
              display: 'flex',
            },
            backgroundColor: '#F3FAFF',
          }
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '16px',
          fontWeight: 600,
          // fontFamily: 'Poppins',
        },
      },
    },
    MuiStepper: {
      styleOverrides: {
        root: {
          alignItems: 'end'
        },
      }
    },
    MuiStepLabel: {
      styleOverrides: {
        label: {
          // fontFamily: 'Poppins',
        }
      }
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: 24,
          fontWeight: 700,
          color: '#646681',
          // fontFamily: 'Poppins',
        },
      },
    },
  },
});

export default theme;
