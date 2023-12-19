import { authService } from "../api/auth/auth.service.js"
import { loggerService } from "../services/logger.service.js"

export function requireAuth(req, res, next) {
  const {loginToken} = req.cookies
  const loggedinUser = authService.validateToken(loginToken)
  if(!loggedinUser) return res.status(401).send('Not authentiacted')
  req.loggedinUser = loggedinUser
  next()
}

export function requireAdmin(req, res, next) {
  const {loginToken} = req.cookies
  const loggedinUser = authService.validateToken(loginToken)

  if(!loggedinUser) return res.status(401).send('Not authentiacted')
  if(!loggedinUser.isAdmin){
    loggerService.warn(`${loggedinUser.fullname} tried to perform admin action`)
    return res.status(401).send('Not authorized')
  } 
  req.loggedinUser = loggedinUser
  next()
}