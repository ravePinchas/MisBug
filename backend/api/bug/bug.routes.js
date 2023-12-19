import express from 'express'
import { addBug, getBugId, getBugs, removeBug, saveBug } from './bug.controller.js'
import { log } from '../../middlewares/logger.middleware.js'
import { requireAuth } from '../../middlewares/requireAuth.middleware.js'

const router = express.Router()

router.get('/',log, getBugs)
router.post('/', requireAuth, addBug)
router.put('/', requireAuth, saveBug)
router.get('/:bugId', getBugId)
router.delete('/:bugId', requireAuth, removeBug)

export const bugRoutes = router