/**
 * 
 * App component
 * @author - NA 
 * @date - 26th March, 2024
 * 
 */
// GENERIC IMPORT
import {Box} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Header from './view/pages/common/header';
import EntryRoutes from './view/routes/entryRoutes';
import theme from './theme'; 

// STYLE IMPORT
import useStyles from './styles';

function App() {
  // DECLARE STYLE
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.container}>
        <Box className={classes.header}><Header/></Box>
        <Box className={classes.contentContainer}><EntryRoutes/></Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
