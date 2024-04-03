import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    btnContainer: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fieldRow: {
        wordBreak: 'break-word',
    }
}));
  
export default useStyles;