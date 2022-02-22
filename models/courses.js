import mongoose from 'mongoose'

const courseSchema = mongoose.Schema({
    name: String,
    content: String,
    topicList: { type: [String], default: []},
    curriculum: { type: [String], default: []},
    demand: { type: [String], default: []},
    purchaseBadge: { type: Object, default: {}},
    url: { type: [String], default: []},
    selectedFile: String,
    user: { type: Number, default: 0},
    id: String
})

const Course = mongoose.model('Course', courseSchema)

export default Course