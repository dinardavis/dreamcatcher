import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box 
      className="login-container"
      width={"100%"}
      >
        <img src='/imgs/travel_dreams_logo.png' className='main-nav-logo' alt='main logo'/>
        <p className="login-title">
          Travel Dreamcatcher
        </p>

      <Box
        width={"100%"}
        p="2rem"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Make all your (travel) dreams come true!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
