import {Request, Response, NextFunction} from "express"
import {verify} from "jsonwebtoken"

interface IPayLoad {
    sub: string
}

export function ensureAuthenticated(request: Request, response:Response, next: NextFunction){
    
    // Receber o token 

    const authToken = request.headers.authorization

    // Validar se token está prenchido

    if(!authToken){
        return response.status(401).end()
    }

    const [, token] = authToken.split(" ")

    try {
        // Validar se o token é válido
        const { sub } = verify(token, "a1d6744a0e11919d24a694dacbdab4a5") as IPayLoad
         
        // Recuperar informações do usuário
        request.user_id = sub

        return next()
    }catch(err) {
        return response.status(401).end()
    }

}
