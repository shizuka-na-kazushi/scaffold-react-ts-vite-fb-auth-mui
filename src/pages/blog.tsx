import { Fragment } from "react"
import AppMenuBar from "../components/appMenuBar"
import {
    Container,
    Typography
} from "@mui/material"
import ConstructionIcon from '@mui/icons-material/Construction';

const Blog = () => {
    return (
        <Fragment>
            <AppMenuBar></AppMenuBar>
            <Container sx={{ mt: 7 }}>
                <Typography align="center" sx={{ mb: 3 }}>
                    <ConstructionIcon fontSize="large" />
                </Typography>
                <Typography align='center'>
                    Blog is not available yet!
                </Typography>
            </Container>
        </Fragment>
    )
}

export default Blog;