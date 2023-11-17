import axios from 'axios'

import { API_URL, STRAPI_API_TOKEN } from './urls'

const APIHeaders = {
	'Content-Type': 'application/json',
	Authorization: `Bearer ${STRAPI_API_TOKEN}`,
}

export const API = axios.create({
	baseURL: API_URL,
	headers: APIHeaders,
})

export const fetchDataFromApi = async (endpoint) => {
	try {
		const res = await API.get(`${API_URL}${endpoint}`)
		return res?.data
	} catch (error) {
		console.log(error, '- Error fetching data.')
		return error
	}
}

export const deleteDataFromApi = async (endpoint) => {
	try {
		const res = await API.delete(`${API_URL}${endpoint}`)
		return res?.data
	} catch (error) {
		console.log(error, '- Error deleting data.')
		return error
	}
}

export const sendSubscriptionEmail = async (endpoint, email) => {
	try {
		const res = await API.post(`${API_URL}${endpoint}`, email)
		return res?.data
	} catch (error) {
		console.log(error, '- Error sending subscription mail.')
		return error
	}
}

export const makePaymentRequest = async (endpoint, payload) => {
	try {
		const res = await API.post(`${API_URL}${endpoint}`, payload)
		return res?.data
	} catch (error) {
		console.log(error, '- Error making payment.')
		return error
	}
}

export const sendResetEmail = async (payload) => {
	try {
		const res = await API.post(`${API_URL}/api/auth/forgot-password`, {
			email: payload,
		})
		return res?.data
	} catch (error) {
		console.log(error, '- Error sending reset mail.')
		return error
	}
}

export const changePassword = async (payload) => {
	const { code, password, passwordConfirmation } = payload

	try {
		const res = await API.post(`${API_URL}/api/auth/reset-password`, {
			code, // code contained in the reset link of step 3.
			password,
			passwordConfirmation,
		})

		return res?.data
	} catch (error) {
		console.log(error, '- Error changing password.')
		return error
	}
}
