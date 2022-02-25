import mongoose from 'mongoose'

const commentShchema = mongoose.Schema({
    videoId: Number,
    position: { type: [Number], default: []},
    userId: String,
    userName: String,
    content: String
})

const Comment = mongoose.model('Comment', commentShchema)
export default Comment