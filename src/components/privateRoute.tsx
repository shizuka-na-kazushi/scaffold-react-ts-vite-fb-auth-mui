import React, { useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext, AuthLoginState } from './authProvider';
import { Typography } from '@mui/material';

type PrivateRouteProps = {
  element: React.ReactElement
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const { authState } = useContext(AuthContext)
  const location = useLocation()

  useEffect(() => {

    console.log(`login state : changed! (isLoggedIn=${authState})`)

  }, [authState])

  if (authState === AuthLoginState.Waiting) {
    return (
      <Typography>Waiting...</Typography>
    )
  } else if (authState === AuthLoginState.NotAuthAuthorized) {
    return <Navigate to="/login" state={{ from: location.pathname }} />
  } else {
    return element
  }
}

export default PrivateRoute;
