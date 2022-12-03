const { Router } = require('express')
const checkAuth = require('../middleware/checkAuth')
const Category = require('../models/Category')
const SubCategory = require('../models/SubCategory')
const Item = require("../models/Item")
const User = require('../models/User')

const router = Router()

// Get My Categories & SubCategories
// http://localhost:5001/api/categories
router.get('/', checkAuth, async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        const list = await Promise.all(user.categories.map((category) => Category.findById(category._id).populate('subCategories')))
        res.json({ result: list })
    } catch (error) {
        res.json({ message: 'Something went wrong...' })
        console.log(error)
    }
})

// Create New Category
// http://localhost:5001/api/categories
router.post('/', checkAuth, async (req, res) => {
    try {
        const { title } = req.body
        const user = await User.findById(req.userId)
        const newCategory = new Category({ title, userId: user._id })

        await newCategory.save()
        await User.findByIdAndUpdate(req.userId, { $push: { categories: newCategory } })

        res.json({ result: newCategory, message: "Category was created" })
    } catch (error) {
        res.json({ message: 'Something went wrong. Try it later...' })
        console.log(error)
    }
})

// Remove Category
// http://localhost:5001/api/categories/:id
router.delete('/:id', checkAuth, async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id)

        if (!category) return res.json({ message: 'This category doesn\'t exist' })

        const list = await SubCategory.find({ parentCategoryId: req.params.id })

        await Promise.all(list.map(el => Item.deleteMany({ parentSubId: el._id })))

        await SubCategory.deleteMany({ parentCategoryId: req.params.id })

        await User.findByIdAndUpdate(req.userId, { $pull: { categories: req.params.id } })
        res.json({ result: category, message: 'Category was deleted' })
    } catch (error) {
        res.json({ message: "Something went wrong..." })
        console.log(error)
    }
})

// Update Category
// http://localhost:5001/api/categories/:id
router.put('/:id', checkAuth, async (req, res) => {
    try {
        const { newTitle } = req.body
        const category = await Category.findById(req.params.id)

        category.title = newTitle

        await category.save()

        res.json({ result: category, message: "Category was updated" })
    } catch (error) {
        res.json({ message: "Something went wrong..." })
        console.log(error)
    }
})

module.exports = router
