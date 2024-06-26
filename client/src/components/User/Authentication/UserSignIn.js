import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Autocomplete from "@mui/material/Autocomplete";
import countries from "../../../Data/country.json";
import { Alert } from "@mui/material";
import { postLoginUser, postSignupUser } from "../../../api/useApi";
import { postAPICall } from "../../../api/common/rxApiStoreBase";
import { useNavigate } from "react-router-dom";

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function UserSignIn() {
  const navigate = useNavigate()

  const [currentSection, setCurrentSection] = useState("login");
  const [errorMessage, setErrorMessage] = useState("");
  const [countryCode, setCountryCode] = useState("");

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    setErrorMessage("")
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    const apiRequestData =await postLoginUser(data.get('email'),data.get('password'));
    const postLoginApi$ = await postAPICall(apiRequestData.apiEndPoint,apiRequestData.configData)

    postLoginApi$.subscribe({
      next:(res)=>{
        if(res.success && res.code===200){
          localStorage.setItem('id_token',res.token)
          localStorage.setItem('role',res.role)
          navigate('/user')
        }else{
          setErrorMessage(res.msg)
        }
      },
      error:(err)=>{
        console.log("err:",err);
        setErrorMessage("something went wrong")
      }
    })
  };

  const handleSubmitCreateAccount = async (event) => {
    event.preventDefault();
    setErrorMessage("")
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
      name: data.get("name"),
      mobile: data.get("mobile"),
      country: countryCode,
      acceptPolicy: data.get("acceptPolicy"),
    },data.getAll);

    const apiRequestData = await postSignupUser(data.get("name"), data.get('email'),data.get('password'),countryCode,data.get("mobile"),data.get("acceptPolicy")==="accept");
    const postLoginApi$ = await postAPICall(apiRequestData.apiEndPoint,apiRequestData.configData)

    postLoginApi$.subscribe({
      next:(res)=>{
        if(res.success && res.code===200){
          // localStorage.setItem('id_token',res.token)
          // localStorage.setItem('role',res.role)
          // navigate('/user')
          setCurrentSection("login")
        }else{
          setErrorMessage(res.msg)
        }
      },
      error:(err)=>{
        console.log("err:",err);
        setErrorMessage("something went wrong")
      }
    })
  };

  const handleSubmitForgotPassword = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {currentSection === "login" && (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            {errorMessage !== "" && (
              <Alert severity="error" className="w-full mt-4">
                {errorMessage}
              </Alert>
            )}
            <Box
              component="form"
              onSubmit={handleSubmitLogin}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                onChange={()=>{setErrorMessage("")}}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                onChange={()=>{setErrorMessage("")}}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </Button>
              <Grid className="flex justify-between">
                <Grid>
                  <Link
                    variant="body2"
                    className="cursor-pointer"
                    onClick={() => {
                      setCurrentSection("forgotPass");
                    }}
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid>
                  <Link
                    className="cursor-pointer"
                    variant="body2"
                    onClick={() => {
                      setCurrentSection("signup");
                    }}
                  >
                    {"Don't have an account?"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        </Container>
      )}
      {currentSection === "signup" && (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Create Account
            </Typography>
            {errorMessage !== "" && (
              <Alert severity="error" className="w-full mt-4">
                {errorMessage}
              </Alert>
            )}
            <Box
              component="form"
              onSubmit={handleSubmitCreateAccount}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                onChange={()=>{setErrorMessage("")}}
                margin="normal"
                required
                fullWidth
                id="name"
                label="Fist name + Last name"
                name="name"
                autoComplete="name"
                autoFocus
              />
              <TextField
                onChange={()=>{setErrorMessage("")}}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
              <TextField
                onChange={()=>{setErrorMessage("")}}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Autocomplete
                id="country-select-demo"
                className="mt-4 mb-2"
                options={countries}
                autoHighlight
                getOptionLabel={(option) => option.label+ ` (+${option.phone})`}
                onChange={(event, newValue) => {setCountryCode(newValue?'+'.concat(newValue.phone):"")}}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    <img
                      loading="lazy"
                      width="20"
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      alt=""
                    />
                    {option.label} ({option.code}) +{option.phone}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    onChange={()=>{setErrorMessage("")}}
                    {...params}
                    label="Choose a country"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                    name="country"
                  />
                )}
              />

              <TextField
                onChange={()=>{setErrorMessage("")}}
                margin="normal"
                required
                fullWidth
                id="mobileNumber"
                label="Mobile Number"
                name="mobile"
                autoComplete="mobile"
                type="number"
              />
              <FormControlLabel
                control={<Checkbox value="accept" color="primary" name="acceptPolicy" />}
                label="Accept privacy policy"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create Account
              </Button>
              <Grid className="flex justify-between">
                <Grid>
                  <Link
                    variant="body2"
                    className="cursor-pointer"
                    onClick={() => {
                      setCurrentSection("forgotPass");
                    }}
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid>
                  <Link
                    className="cursor-pointer"
                    variant="body2"
                    onClick={() => {
                      setCurrentSection("login");
                    }}
                  >
                    {"Already have an account?"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        </Container>
      )}
      {currentSection === "forgotPass" && (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Forgot password?
            </Typography>
            {errorMessage !== "" && (
              <Alert severity="error" className="w-full mt-4">
                {errorMessage}
              </Alert>
            )}
            <Box
              component="form"
              onSubmit={handleSubmitForgotPassword}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                onChange={()=>{setErrorMessage("")}}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Forgot password
              </Button>
              <Grid className="flex justify-between">
                <Grid>
                  <Link
                    className="cursor-pointer"
                    variant="body2"
                    onClick={() => {
                      setCurrentSection("signup");
                    }}
                  >
                    {"Don't have an account?"}
                  </Link>
                </Grid>
                <Grid>
                  <Link
                    className="cursor-pointer"
                    variant="body2"
                    onClick={() => {
                      setCurrentSection("login");
                    }}
                  >
                    {"Already have an account?"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        </Container>
      )}
    </ThemeProvider>
  );
}
