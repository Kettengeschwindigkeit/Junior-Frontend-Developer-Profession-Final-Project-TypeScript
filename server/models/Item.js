const { model, Schema, Types } = require('mongoose')

const ItemSchema = new Schema({
    title: { type: String, required: true },
    translate: { type: String, required: true },
    parentSubId: { type: String },
},
    { timestamps: true }
)

module.exports = model('Item', ItemSchema)
