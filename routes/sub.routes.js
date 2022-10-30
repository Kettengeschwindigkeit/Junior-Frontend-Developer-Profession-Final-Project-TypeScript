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

        res.json({ result: newSubCategory, message: "SubCategory was created" })
    } catch (error) {
        res.json({ message: "Something went wrong..." })
    }
})

module.exports = router
