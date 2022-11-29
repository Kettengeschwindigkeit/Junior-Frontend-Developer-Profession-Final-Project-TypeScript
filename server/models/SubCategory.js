const { model, Schema, Types } = require('mongoose')

const SubCategorySchema = new Schema({
    title: { type: String, required: true },
    items: [{ type: Types.ObjectId, ref: 'Item' }],
    parentCategoryId: { type: String },
},
    { timestamps: true }
)

module.exports = model('SubCategory', SubCategorySchema)
