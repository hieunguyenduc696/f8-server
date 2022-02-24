import express from 'express'

import auth from '../middleware/auth.js'
import { getCourse, getCourses, registerCourse } from '../controllers/courses.js'

const router = express.Router()

router.get(`/:id`, getCourse)
router.get(`/`, getCourses)
router.patch('/:id/registercourse', auth, registerCourse)

export default router