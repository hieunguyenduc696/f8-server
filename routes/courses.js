import express from 'express'

import auth from '../middleware/auth.js'
import { getCourse, getCourses, registerCourse, seenCourse } from '../controllers/courses.js'

const router = express.Router()

router.get(`/:id`, getCourse)
router.get(`/`, getCourses)
router.patch('/:id/registercourse', auth, registerCourse)
router.patch('/:id/seencourse', auth, seenCourse)

export default router