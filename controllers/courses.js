import Course from '../models/courses.js'
import { readFile } from 'fs'

export const getCourses = async (req, res) => {
    try {
        let courses
        readFile(`C:\\Users\\hieun\\Desktop\\f8-clone\\server\\data\\html-css.txt`, 'utf-8', (err, result) => {
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
    let courseName = ''
    if (id === '1') {
        courseName = 'html-css'
    }
    try {
        let courses
        // console.log(courseName)
        readFile(`C:\\Users\\hieun\\Desktop\\f8-clone\\server\\data\\${courseName}.txt`, 'utf-8', (err, result) => {
            if (err) {
                console.error(err)
                return
            }
            courses = "{" + result + "}"
            courses = (JSON.parse(`${courses}`))
            res.status(200).json(courses)
        })
        // console.log(courses)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}
export const createCourse = (req, res) => {
    res.send('hello')
}