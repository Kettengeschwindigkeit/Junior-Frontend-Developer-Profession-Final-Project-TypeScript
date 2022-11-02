const { Router } = require("express")
const checkAuth = require("../middleware/checkAuth")
const Category = require("../models/Category")
const SubCategory = require("../models/SubCategory")
const Item = require("../models/Item")
const User = require("../models/User")

const router = Router()

// Create Item 
// http://localhost:5001/api/items
router.post("/", async (req, res) => {
    try {
        const { subId, title, translate } = req.body

        // if (!Item) {
        //     return res.json({ message: "Title is empty" })
        // }

        const newItem = new Item({ title, translate, parentSubId: subId })
        await newItem.save()

        try {
            await SubCategory.findByIdAndUpdate(subId, {
                $push: { items: newItem._id }
            })
        } catch (error) {
            console.log(error)
        }
        res.json({ result: newItem, message: "Item was created" })
    } catch (error) {
        res.json({ errorMessage: "Something went wrong..." })
    }
})

// Remove Item
// http://localhost:5001/api/items/:id
router.delete('/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id)
        const subCategory = await SubCategory.findById(item.parentSubId)
        const subCategoryId = subCategory._id

        if (!item) return res.json({ message: 'This item doesn\'t exist' })

        await SubCategory.findByIdAndUpdate(subCategoryId, {
            $pull: { items: req.params.id }
        })
        res.json({ result: item, message: 'Item was deleted' })
    } catch (error) {
        res.json({ errorMessage: "Something went wrong..." })
    }
})

// Update Item
// http://localhost:5001/api/items/:id
router.put('/:id', async (req, res) => {
    try {
        const { newTitle, newTranslate } = req.body
        const item = await Item.findById(req.params.id)

        item.title = newTitle
        item.translate = newTranslate

        await item.save()

        res.json({ result: item, message: "Item was updated" })
    } catch (error) {
        res.json({ errorMessage: "Something went wrong..." })
    }
})

// Get Items By Search
// http://localhost:5001/api/items/search
router.post("/search", async (req, res) => {
    try {
        const { starts_with } = req.body
        const items = await Item.find({ "title": { $regex: '^' + starts_with } }).exec()
        res.json({ result: items })
    } catch (error) {
        res.json({ message: "Something went wrong..." })
    }
})

module.exports = router
