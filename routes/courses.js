import express from 'express'

import auth from '../middleware/auth.js'
import { getCourse, getCourses } from '../controllers/courses.js'

const router = express.Router()

router.get(`/:id`, getCourse)
router.get(`/`, getCourses)

export default router