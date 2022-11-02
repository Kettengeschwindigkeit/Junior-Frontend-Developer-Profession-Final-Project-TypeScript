const { Router } = require('express')
const Category = require('../models/Category')
const SubCategory = require('../models/SubCategory')
const Item = require("../models/Item")

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

        await Item.deleteMany({ parentSubId: req.params.id })

        await Category.findByIdAndUpdate(subCategory.parentCategoryId, { $pull: { subCategories: req.params.id } })
        res.json({ result: subCategory, message: 'Sub-category was deleted' })
    } catch (error) {
        res.json({ errorMessage: "Something went wrong..." })
    }
})

// Update SubCategory
// http://localhost:5001/api/sub/:id
router.put('/:id', async (req, res) => {
    try {
        const { newTitle } = req.body
        const subCategory = await SubCategory.findById(req.params.id)

        subCategory.title = newTitle

        await subCategory.save()

        res.json({ result: subCategory, message: "Sub-category was updated" })
    } catch (error) {
        res.json({ errorMessage: "Something went wrong..." })
    }
})

// Get SubCategory By Id
// http://localhost:5001/api/sub/:id
router.get('/:id', async (req, res) => {
    try {
        const sub = await SubCategory.findById(req.params.id)
        const list = await Promise.all(sub.items.map(item => Item.findById(item)))
        res.json({ result: { sub, list } })
    } catch (error) {
        res.json({ errorMessage: "Something went wrong..." })
    }
})

module.exports = router
