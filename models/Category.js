const { model, Schema, Types } = require('mongoose')

const CategorySchema = new Schema({
    title: { type: String, required: true },
    subCategories: [{ type: Types.ObjectId, ref: 'SubCategory' }],
    userId: { type: String }
},
    { timestamps: true }
)

module.exports = model('Category', CategorySchema)
