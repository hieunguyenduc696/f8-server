import express from 'express'

import { signup, signin, getUserById } from '../controllers/users.js'

const router = express.Router()

router.post('/signin', signin)
router.post('/signup', signup)
router.get("/:uid", getUserById);

export default router