import Course from '../models/courses.js'
import mongoose from 'mongoose'
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