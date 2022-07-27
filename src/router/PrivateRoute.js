import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router'
import { AuthContext } from '../auth'

export const PrivateRoute = ({ children }) => {

	const {pathname, search} = useLocation();

	const { logged } = useContext( AuthContext );

	const lastPath = pathname + search;
	localStorage.setItem('lastPath', lastPath);
	
	return ( logged )
	 ? children
	 : <Navigate to="login" />
}
