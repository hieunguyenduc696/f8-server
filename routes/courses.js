import express from 'express'

import { getCourse, getCourses, createCourse } from '../controllers/courses.js'

const router = express.Router()

router.get(`/:id`, getCourse)
router.get(`/`, getCourses)
router.post('/', createCourse)

export default router