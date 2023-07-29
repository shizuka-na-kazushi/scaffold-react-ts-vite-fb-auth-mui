import React, { useState } from "react";
import { auth, db } from "../fb/firebase";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile, User } from "firebase/auth";
import { setDoc, doc, } from 'firebase/firestore'
import { useNavigate } from "react-router-dom"
import {
    Box,
    Button,
    Container,
    Grid,
    TextField, CssBaseline, Link, Typography,
} from "@mui/material";
import { ModelUser } from "../db/dbModels";


function GoToHome(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            <Link color="inherit" href="/">
                Top page
            </Link>{' '}
        </Typography>
    );
}

const CreateUser: React.FC = () => {
    const [displayName, setDisplayName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate()

    const storeInitialUserEntry = async (user: User) => {
        if (user) {
            const userData: ModelUser = {
                name: user.displayName,
                email: user.email,
                uid: user.uid,
            };
            setDoc(doc(db, 'Users', user.uid), userData);
        }
    }
    const createFbUser = async () => {
        await createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                console.log(userCredential);
                await updateProfile(userCredential.user, { displayName: displayName })
                await sendEmailVerification(userCredential.user)
                await storeInitialUserEntry(userCredential.user)
                navigate("/");
            })
            .catch((error) => {
                alert(error.message);
                console.error(error);
            });
    };

    const handleChangeDisplayName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDisplayName(event.currentTarget.value);
    };
    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value);
    };
    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Typography component="h4" variant="h4">Sign up</Typography>

                <Box component="form" sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                                name="displayName"
                                label="Friendly name"
                                fullWidth
                                variant="outlined"
                                value={displayName}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChangeDisplayName(event);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                                name="email"
                                label="E-mail"
                                fullWidth
                                variant="outlined"
                                value={email}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChangeEmail(event);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                                name="password"
                                label="Password"
                                fullWidth
                                variant="outlined"
                                type="password"
                                value={password}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChangePassword(event);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained"
                                fullWidth
                                style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                                onClick={createFbUser}
                            >
                                Sign up
                            </Button>
                        </Grid>



                    </Grid>
                </Box>

                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="/login" variant="body2">
                            Do you have an account?
                        </Link>
                    </Grid>
                </Grid>

            </Box>
            <GoToHome sx={{ mt: 5 }}></GoToHome>
        </Container>
    );
};

export default CreateUser;
