const { Router } = require('express')
const checkAuth = require('../middleware/checkAuth')
const Category = require('../models/Category')
const SubCategory = require('../models/SubCategory')
const User = require('../models/User')

const router = Router()

// Create SubCategory 
// http://localhost:5001/api/sub
router.post("/", async (req, res) => {
    try {
        const { id, title } = req.body
        const newSubCategory = new SubCategory({ title, parentCategoryId: id })

        await newSubCategory.save()

        await Category.findByIdAndUpdate(id, { $push: { subCategories: newSubCategory._id } })

        res.json({ result: newSubCategory, message: "Sub-category was created!" })
    } catch (error) {
        res.json({ errorMessage: "Something went wrong..." })
    }
})

// Remove SubCategory
// http://localhost:5001/api/sub/:id
router.delete('/:id', async (req, res) => {
    try {
        const subCategory = await SubCategory.findByIdAndDelete(req.params.id)

        if (!subCategory) return res.json({ message: 'This sub-category doesn\'t exist' })

        // await Item.deleteMany({ subCategory: req.params.id })

        await Category.findByIdAndUpdate(subCategory.parentCategoryId, { $pull: { subCategories: req.params.id } })
        res.json({ result: subCategory, message: 'Sub-category was deleted' })
    } catch (error) {
        res.json({ errorMessage: "Something went wrong..." })
    }
})

module.exports = router
