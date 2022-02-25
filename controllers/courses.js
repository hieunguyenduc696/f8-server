import mongoose from 'mongoose'
import Comment from '../models/comments.js'
import User from '../models/users.js'
import { readFile, writeFile } from 'fs'

export const getCourses = async (req, res) => {
    try {
        let courses
        readFile(`C:\\Users\\hieun\\Desktop\\f8-clone\\server\\data\\totalCoursesSave.txt`, 'utf-8', (err, result) => {
            if (err) {
                console.error(err)
                return
            }
            courses = "{" + result + "}"
            courses = (JSON.parse(`${courses}`))
            res.status(200).json(courses)
        })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getCourse = async (req, res) => {
    const { id } = req.params
    try {
        let courses
        readFile(`C:\\Users\\hieun\\Desktop\\f8-clone\\server\\data\\totalCoursesSave.txt`, 'utf-8', (err, result) => {
            if (err) {
                console.error(err)
                return
            }
            courses = "{" + result + "}"
            courses = (JSON.parse(`${courses}`))
            let course = courses.courses.find(c => c.id === Number(id))
            res.status(200).json(course)
        })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const registerCourse = async (req, res) => {
    const { id } = req.params
    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }
    let courses
    let course
    try {
        readFile(`C:\\Users\\hieun\\Desktop\\f8-clone\\server\\data\\totalCoursesSave.txt`, 'utf-8', (err, result) => {
            if (err) {
                console.error(err)
                return
            }
            courses = "{" + result + "}"
            courses = (JSON.parse(`${courses}`))
            course = courses.courses.find(c => c.id === Number(id))
            course.registers.push(req.userId)
            course.available[0][0].push(req.userId)
            writeFile(`C:\\Users\\hieun\\Desktop\\f8-clone\\server\\data\\totalCoursesSave.txt`, JSON.stringify(courses).slice(1,-1), (err, result) => {
                if (err) {
                    console.log(err)
                    return
                }
                console.log(result)
            })
            res.status(200).json(course);
        })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const seenCourse = async (req, res) => {
    const { id } = req.params
    let { i, j } = req.body
    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }
    let courses
    let course
    try {
        readFile(`C:\\Users\\hieun\\Desktop\\f8-clone\\server\\data\\totalCoursesSave.txt`, 'utf-8', (err, result) => {
            if (err) {
                console.error(err)
                return
            }
            courses = "{" + result + "}"
            courses = (JSON.parse(`${courses}`))
            course = courses.courses.find(c => c.id === Number(id))
            if (!course.state[i][j].find(c => c === req.userId)) {
                course.state[i][j].push(req.userId)
            }
            if (j + 1 == course.state[i].length) {
                i+=1
                j=-1
            }
            if (!course.available[i][j+1].find(c => c === req.userId)) {
                course.available[i][j+1].push(req.userId)
            }
            writeFile(`C:\\Users\\hieun\\Desktop\\f8-clone\\server\\data\\totalCoursesSave.txt`, JSON.stringify(courses).slice(1,-1), (err, result) => {
                if (err) {
                    console.log(err)
                    return
                }
                // console.log(result)
            })
            res.status(200).json(course);
        })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createComment = async (req, res) => {
    const { id } = req.params
    const { content, i, j, name, image } = req.body
    const userId = req.userId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        try {
            const comment = await Comment.create({ videoId: id, position: [i, j], userId, userName: name, content: content, image })
            res.status(201).json(comment)
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    } else {
        let user
        try {
            user = await User.findById(userId);
        } catch (err) {
            res.json({ message: err.message })
        }
        try {
            const comment = await Comment.create({ videoId: id, position: [i, j], userId, userName: user.name, content: content })
            res.status(201).json(comment)
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }
}

export const getComment = async (req, res) => {
    const { id } = req.params
    const {i, j} = req.query
    try {
        const comments = await Comment.find({ videoId: id, position: [Number(i), Number(j)] })
        res.status(200).json(comments.reverse())
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}