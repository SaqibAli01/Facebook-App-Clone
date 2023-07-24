import { createTheme } from '@mui/material/styles';

const themeObj = {
    light: {
        text: {
            primary: '#000',
            white: '#fff',
            lightBrown: '#8b8b8b',
            light: '#c0c0c0',
            gray: '#c0c0c0',
            navBtnText: 'white',

        },
        background: {
            blackLight: '#161616',
            hard: '#fff',
            medium: '#f4f4f4',
            light: '#efefef',
            grayBg: '#BDBDBD',
            borderLight: '#F6F6F6',
            shadow: '0px 0px 7px #ddd',
            greenColor: 'rgba(27,200,112,1)',
            greenColorLight: '#3DD091',
            lightGreen: 'rgba(27,200,112,0.2)',
            redColor: 'rgba(255,0,51,1)',
            lightRed: 'rgba(255,0,51,0.2)',
            btnBg: '#efefef',
            navBtn: 'black',
            boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
            NavShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",


        },
    },

    dark: {
        text: {
            primary: '#fff',
            light: '#c0c0c0',
            lightBrown: '#8b8b8b',
            navBtnText: 'black',
        },
        background: {
            hard: '#000',
            medium: '#151515',
            light: '#212121',
            borderLight: '#424242',
            shadow: '0px 0px 7px #ddd',
            greenColor: 'rgba(27,200,112,1)',
            lightGreen: 'rgba(27,200,112,0.2)',
            redColor: 'rgba(255,0,51,1)',
            lightRed: 'rgba(255,0,51,0.2)',
            btnBg: '#2e2d2d',


            navBtn: 'white',
            boxShadow: "rgba(192,192,192) 0px 22px 70px 4px",
            NavShadow: "0px 2px 4px rgba(192, 192, 192), 0px 7px 13px -3px rgba(192, 192, 191), 0px -3px 0px inset rgba(192, 192, 190)",


        },
    },
};

export const createCustomTheme = (mode) =>
    createTheme({
        palette: {
            mode,
            ...themeObj[mode],
        },
        typography: {
            fontFamily: ['Poppins', 'sans-serif'].join(','),
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: (theme) => `
		    body {
		      background-color: ${theme.palette.mode === 'dark' ? '#131213' : '#fdfdfd'}
		    }
		  `,
            },
            MuiButton: {
                variants: [
                    {
                        props: { variant: 'gradient' },
                        style: {
                            background: 'linear-gradient(97.01deg, #6C7DEB 8.16%, #50A6ED 103.71%)',
                            boxShadow: '0px 0px 10px 1px rgba(0, 0, 0, 0.3)',
                            color: '#fff',
                            fontFamily: 'Work Sans',
                            fontStyle: 'normal',
                            fontSize: '13px',
                            lineHeight: '24px',
                            letterSpacing: '0.045em',
                            '&:hover': {
                                background:
                                    'linear-gradient(97.01deg, #50A6ED 8.16%, #6C7DEB 103.71%)',
                            },
                        },
                    },
                    {
                        props: { variant: 'btn1' },
                        style: {
                            background: 'linear-gradient(97.01deg, #3dd091 8.16%, #3dd091 103.71%)',
                            boxShadow: '0px 0px 10px 1px rgba(0, 0, 0, 0.3)',
                            color: '#fff',
                            fontFamily: 'Work Sans',
                            fontStyle: 'normal',
                            fontSize: '13px',
                            lineHeight: '24px',
                            letterSpacing: '0.045em',
                            '&:hover': {
                                background:
                                    'linear-gradient(97.01deg, #6C6C6C 8.16%, #6C6C6C 103.71%)',
                            },
                        },
                    },
                ],
            },
        },
    });