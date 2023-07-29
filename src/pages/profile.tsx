import { Fragment, useContext, } from "react";
import { TableContainer, Table, TableBody, TableRow, TableCell, Container, Paper, TableHead } from "@mui/material";

import { AuthContext } from "../components/authProvider";
import AppMenuBar from "../components/appMenuBar";

const Profile = () => {
    const { currentUserInfo } = useContext(AuthContext)

    return (
        <Fragment>
            <AppMenuBar></AppMenuBar>
            <Container maxWidth='md'>
                <Paper sx={{ mt: 6 }}>

                    <TableContainer >
                        <Table sx={{ minWidth: 650 }}>
                            <TableHead></TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell sx={{ color: 'primary,' }}>Name</TableCell><TableCell>{currentUserInfo?.name}</TableCell>
                                </TableRow>
                            </TableBody>
                            <TableRow>
                                <TableCell sx={{ color: 'primary,' }}>E-mail</TableCell><TableCell>{currentUserInfo?.email}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ color: 'primary,' }}>User ID</TableCell><TableCell>{currentUserInfo?.uid}</TableCell>
                            </TableRow>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>
        </Fragment>
    )
}

export default Profile;

