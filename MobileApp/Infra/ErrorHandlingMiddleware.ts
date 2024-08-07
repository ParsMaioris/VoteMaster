import {Middleware} from '@reduxjs/toolkit'

interface Action
{
    type: string
    payload?: any
}

interface CustomError extends Error
{
    response?: {
        status: number
    }
}

const errorHandlingMiddleware: Middleware = storeAPI => next => (action: unknown) =>
{
    if (isAction(action) && action.type.endsWith('/rejected') && isCustomError(action.payload))
    {
        const error = action.payload
        action.payload = {
            message: error.message,
            code: error.response?.status,
        }
    }
    return next(action)
}

function isAction(action: unknown): action is Action
{
    return typeof action === 'object' && action !== null && 'type' in action
}

function isCustomError(error: any): error is CustomError
{
    return error instanceof Error && 'response' in error
}

export default errorHandlingMiddleware