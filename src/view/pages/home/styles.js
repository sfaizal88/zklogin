import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flex: 1,
        gap: '16px',
        flexDirection: 'column',
    },
    fieldRow: {
        wordBreak: 'break-word',
        width: '600px',
    },
    card: {
        padding: '12px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backlground: '#ccc'
    },
    btnContainer: {
        display: 'flex',
        flex: 1,
        gap: '12px',
        marginTop: '12px'
    }
}));
  
export default useStyles;