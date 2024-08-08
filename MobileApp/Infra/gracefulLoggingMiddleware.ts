import {Middleware} from '@reduxjs/toolkit'

const gracefulLoggingMiddleware: Middleware = store => next => action =>
{
    if (action.type.endsWith('/pending'))
    {
        console.log(`Action Pending: ${action.type}`, action)
    } else if (action.type.endsWith('/fulfilled'))
    {
        console.log(`Action Fulfilled: ${action.type}`, action)
    } else if (action.type.endsWith('/rejected'))
    {
        console.log(`Action Rejected: ${action.type}`, action)
    } else
    {
        console.log(`Action Dispatched: ${action.type}`, action)
    }
    return next(action)
}

export default gracefulLoggingMiddleware