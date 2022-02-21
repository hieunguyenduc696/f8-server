import Course from '../models/courses.js'
import { readFile } from 'fs'

export const getHTMLCSSCourse = async (req, res) => {
    try {
        let courses
        readFile('C:\\Users\\hieun\\Desktop\\f8-clone\\server\\data\\html-css.txt', 'utf-8', (err, result) => {
            if (err) {
                console.error(err)
                return
            }
            courses = "{" + result + "}"
            courses = (JSON.parse(`${courses}`))
        })

        res.status(200).json(courses)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}
export const createCourse = (req, res) => {
    res.send('hello')
}