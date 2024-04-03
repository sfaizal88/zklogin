import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    header: { 
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        padding: '16px 25px 17px 20px',
        background: '#145cc2',
        /* position: 'fixed',
        top: 0,
        left: 0,
        right: 0, */
        color: '#fff',
        fontSize: '21px',
        gap: '4px',
        fontWeight: 600
    },
}));
  
export default useStyles;