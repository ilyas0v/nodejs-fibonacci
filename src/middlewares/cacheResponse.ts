import { NextFunction } from 'express'
import QueryString from 'qs'
import redisClient from '~/libs/redisClient'

export const cacheResponse = async (req: any, res: any, next: NextFunction) => {
    const cacheKey = generateCacheKey(req)

    res.sendResponse = res.json

    res.json = (body: any) => {
        redisClient.set(
            cacheKey,
            JSON.stringify({
                statusCode: res.statusCode,
                body: body,
            }),
            {
                EX: 3600 * 60,
            },
        )

        res.sendResponse(body)
    }

    const result = await redisClient.get(cacheKey)

    if (result) {
        const { statusCode, body } = JSON.parse(result)
        console.log({
            statusCode,
            body,
        })
        return res.status(statusCode).json(body)
    }

    return next()
}

const generateCacheKey = (req: any) => {
    let cacheKey = `method=${req.method}-url=${req.originalUrl}-userId=${req?.decoded?.user_id}`
    cacheKey += `-${QueryString.stringify(req.query)}`
    cacheKey += `-${QueryString.stringify(req.body)}`
    cacheKey += `-${QueryString.stringify(req.params)}`
    return cacheKey
}
