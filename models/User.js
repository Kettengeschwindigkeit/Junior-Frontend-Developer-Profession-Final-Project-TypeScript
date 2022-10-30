const { model, Schema, Types } = require('mongoose')

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    categories: [{ type: Types.ObjectId, ref: 'Category' }]
},
    { timestamps: true }
)

module.exports = model('User', UserSchema)
