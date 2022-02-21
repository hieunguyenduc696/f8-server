import express from 'express'

import { getHTMLCSSCourse, createCourse } from '../controllers/courses.js'

const router = express.Router()

router.get('/html-css', getHTMLCSSCourse)
router.post('/', createCourse)

export default router