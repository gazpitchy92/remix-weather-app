import {
  Card,
  Typography,
  Box,
  Button,
  IconButton,
  styled,
} from "@mui/material";

export const StyledContainer = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(2),
  backgroundColor: "#ffffff",
  backgroundImage: "url(/images/background.jpg)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  width: "100vw",
  height: "98vh",
  position: "absolute",
  top: 0,
  margin: "auto",
  left: 0,
  overflow: "hidden",
}));

export const ResponsiveTypography = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  [theme.breakpoints.down('sm')]: {
    fontSize: "1.5rem",
    marginTop: theme.spacing(10),
    textAlign: "center",
    justifyContent: "center",
  },
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  // Default styles (non-mobile)
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  // Styles for extra-small screens (mobiles)
  [theme.breakpoints.down('sm')]: {
    justifyContent: "center",
  },
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(1),
}));

export const RefreshButton = styled(Button)(({ theme }) => ({
  position: "fixed",
}));

export const LogoutButton = styled(Button)(({ theme }) => ({
  position: "fixed",
}));

export const AddCityButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(10),
}));

export const RemoveIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.error.main,
}));

export const WeatherIcon = styled("img")`
  width: 100px;
  height: 100px;
  marginBottom: 20px;
  imageRendering: smooth;
`;

export const WeatherInfoBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const WeatherCity = styled(Typography)({
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "16px",
});

export const WeatherTemperature = styled(Typography)({
  fontSize: "48px",
  marginBottom: "8px",
});
