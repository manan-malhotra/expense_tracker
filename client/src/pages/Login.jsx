import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
    Box,
    IconButton,
    Typography,
    useTheme,
    TextField,
    Button,
} from "@mui/material";
import { tokens } from "../styles/theme";
import { useGlobalContext } from "../context/globalContext";
export default function Login() {
    const { login } = useGlobalContext();
    const navigate = useNavigate();
    const handleClick = () => {
        login({ username, password });
        // navigate("/dashboard");
    };
    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/dashboard");
        }
    }, []);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    return (
        <>
            <Box height={"15vh"} onClick={handleClick}>
                <Typography
                    variant="h2"
                    fontWeight="600"
                    color={colors.grey[100]}
                    textAlign="center"
                    paddingTop={"33px"}
                >
                    Expense Tracker
                </Typography>
            </Box>
            <Box
                gridColumn="span 8"
                height="70vh"
                backgroundColor={colors.primary[400]}
                width={"40%"}
                marginLeft="auto"
                marginRight="auto"
                borderRadius="1.5rem"
            >
                <Typography
                    variant="h3"
                    fontWeight="600"
                    color={colors.grey[100]}
                    textAlign="center"
                    marginLeft="auto"
                    marginRight="auto"
                    paddingTop={"33px"}
                >
                    Login
                </Typography>
                <Box
                    marginLeft="auto"
                    marginRight="auto"
                    paddingY={"10%"}
                    paddingX={"15%"}
                >
                    <TextField
                        margin="normal"
                        key="username"
                        fullWidth
                        variant="filled"
                        type="text"
                        label={"Username"}
                        value={username}
                        name={username}
                        onChange={(e) => setUsername(e.target.value)}
                        sx={{
                            "& .MuiInputLabel-root": {
                                color: colors.grey[100],
                            },
                            "& .MuiInputLabel-root:active": {
                                color: colors.grey[400],
                            },
                            "& .MuiInputLabel-root:focus": {
                                color: colors.grey[100],
                            },
                            "& .MuiFilledInput-root": {
                                backgroundColor: colors.primary[400],
                                color: colors.grey[100],
                            },
                        }}
                    />
                    <div style={{ marginTop: "15px" }}>
                        <TextField
                            margin="normal"
                            key="password"
                            type={"password"}
                            fullWidth
                            variant="filled"
                            label={"Password"}
                            value={password}
                            name={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{
                                "& .MuiInputLabel-root": {
                                    color: colors.grey[100],
                                },
                                "& .MuiInputLabel-root:active": {
                                    color: colors.grey[400],
                                },
                                "& .MuiInputLabel-root:focus": {
                                    color: colors.grey[100],
                                },
                                "& .MuiFilledInput-root": {
                                    backgroundColor: colors.primary[400],
                                    color: colors.grey[100],
                                },
                            }}
                        />
                    </div>
                </Box>
                <Box display={"flex"} justifyContent={"center"}>
                    New User?
                    <Link
                        to="/register"
                        style={{
                            marginLeft: "5px",
                            color: colors.grey[100],
                        }}
                    >
                        Register
                    </Link>
                </Box>
                <Box display="flex" justifyContent="center" mt="20px">
                    <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                        onClick={handleClick}
                        style={{ width: "50%" }}
                    >
                        Login
                    </Button>
                </Box>
            </Box>
        </>
    );
}
