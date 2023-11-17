import Router from 'next/router'
import { setCookie, destroyCookie } from 'nookies'

export const setToken = (token) => {
	if (!token) return

	setCookie({ token }, 'jwt', token.data.jwt, {
		httpOnly: false,
		secure: process.env.NODE_ENV !== 'development',
		maxAge: 30 * 24 * 60 * 60,
		path: '/',
	})

	setCookie({ token }, 'user', JSON.stringify(token.data.user), {
		httpOnly: false,
		secure: process.env.NODE_ENV !== 'development',
		maxAge: 30 * 24 * 60 * 60,
		path: '/',
	})
}

export const logOut = (token) => {
	destroyCookie(token, 'jwt')
	destroyCookie(token, 'user')

	Router.replace('/')
}
