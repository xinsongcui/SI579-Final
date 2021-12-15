import mongoose from 'mongoose'

const projectSchema = mongoose.Schema({
    message: String,
    name: String,
    timestamp: String,
    received: Boolean,
});

export default mongoose.model('messagecontent', projectSchema)