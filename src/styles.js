import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        minHeight: '100vh'
    },
    header: {
        height: '58px'
    },
    contentContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '-60px',
    }
}));
  
export default useStyles;