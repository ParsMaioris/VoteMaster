import {useState, useEffect} from 'react'

export const useFormInput = (initialEmail = '', initialPassword = '') =>
{
    const [email, setEmail] = useState(initialEmail)
    const [password, setPassword] = useState(initialPassword)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() =>
    {
        setEmail(initialEmail)
        setPassword(initialPassword)
    }, [initialEmail, initialPassword])

    return {
        email,
        setEmail,
        password,
        setPassword,
        errorMessage,
        setErrorMessage,
    }
}