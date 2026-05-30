import axios from "axios"

const API = "http://localhost:3007"

export const registerUser = async (data: {
  email: string
  password: string
}) => {
  return axios.post(`${API}/auth/register`, data)
}

export const loginUser = async (data: {
  email: string
  password: string
}) => {
  return axios.post(`${API}/auth/login`, data)
}