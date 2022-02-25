import express from 'express'

import auth from '../middleware/auth.js'
import { getCourse, getCourses, registerCourse, seenCourse, createComment, getComment } from '../controllers/courses.js'

const router = express.Router()

router.get(`/:id`, getCourse)
router.get(`/`, getCourses)
router.patch('/:id/registercourse', auth, registerCourse)
router.patch('/:id/seencourse', auth, seenCourse)

router.post('/:id/comment', auth, createComment)
router.get('/:id/comment', auth, getComment)

export default router