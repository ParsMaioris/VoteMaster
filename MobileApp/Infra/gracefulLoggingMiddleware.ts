import {Middleware} from '@reduxjs/toolkit'

const pendingActions = new Set<string>()

const gracefulLoggingMiddleware: Middleware = store => next => action =>
{
    if (action.type.endsWith('/pending'))
    {
        if (pendingActions.has(action.type))
        {
            console.warn(`Duplicate Pending Action Detected: ${action.type}`, action)
        } else
        {
            pendingActions.add(action.type)
        }
        console.log(`Action Pending: ${action.type}`, action)
    } else if (action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected'))
    {
        if (pendingActions.has(action.type.replace('/fulfilled', '/pending').replace('/rejected', '/pending')))
        {
            pendingActions.delete(action.type.replace('/fulfilled', '/pending').replace('/rejected', '/pending'))
        }
        console.log(`Action ${action.type.endsWith('/fulfilled') ? 'Fulfilled' : 'Rejected'}: ${action.type}`, action)
    } else
    {
        console.log(`Action Dispatched: ${action.type}`, action)
    }
    return next(action)
}

export default gracefulLoggingMiddleware