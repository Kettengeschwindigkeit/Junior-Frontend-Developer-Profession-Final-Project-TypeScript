const { Router } = require('express')
const checkAuth = require('../middleware/checkAuth')
const Category = require('../models/Category')
const SubCategory = require('../models/SubCategory')
const User = require('../models/User')

const router = Router()

// Get My Categories & SubCategories
// http://localhost:5001/api/categories
router.get('/', checkAuth, async (req, res) => {
    try {
        const user = await User.findById(req.userId)                                                                                              // находим 'user' по 'id'
        const list = await Promise.all(user.categories.map((category) => Category.findById(category._id).populate('subCategories')))              // получаем все 'categories' и 'subCategories' данного 'user'
        res.json({ result: list })                                                                                                                // возвращаем найденные 'categories'
    } catch (error) {
        res.json({ message: 'Something went wrong...' })                                                                                           // возвращаем сообщение об ошибке
        console.log(error)
    }
})

// Create New Category
// http://localhost:5001/api/categories
router.post('/', checkAuth, async (req, res) => {
    try {
        const { title } = req.body                                                                                                                // получаем переданный в запросе 'title'
        const user = await User.findById(req.userId)                                                                                              // находим 'user' по 'id'
        const newCategory = new Category({ title, userId: user._id })                                                                             // создаем 'newCategory', передаем 'title' и 'user._id' 

        await newCategory.save()                                                                                                                  // сохраняем созданную 'newCategory' в базу данных
        await User.findByIdAndUpdate(req.userId, { $push: { categories: newCategory } })                                                          // добавляем созданную 'newCategory' пользователю

        res.json({ result: newCategory, message: "Category was created" })                                                                        // возвращаем созданную 'newCategory' и сообщение
    } catch (error) {
        res.json({ message: 'Something went wrong. Try it later...' })                                                                            // возвращаем сообщение если что-то пошло не так
        console.log(error)
    }
})

// Remove Category
// http://localhost:5001/api/categories/:id
router.delete('/:id', checkAuth, async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id)                                                                           // находим 'caetgory' по 'id' и удаляем из базы данных

        if (!category) return res.json({ message: 'This category doesn\'t exist' })                                                                // если такой 'category' не существует, возвращаем сообщение об этом

        // const list = await SubCategory.find({ parentCategoryId: req.params.id })                                                                   // находим список 'subCategories', принадлежащих данной 'category'

        // await Promise.all(list.map(el => Item.deleteMany({ subCategory: (el._id).toString() })))

        // await SubCategory.deleteMany({ category: req.params.id })

        await User.findByIdAndUpdate(req.userId, { $pull: { categories: req.params.id } })                                                          // обновляем 'user' и удаляем у него данную 'category' в базе данных
        res.json({ result: category, message: 'Category was deleted' })                                                                             // возвращаем удаленную 'category' и сообщение
    } catch (error) {
        res.json({ message: "Something went wrong..." })                                                                                            // возвращаем сообщение если что-то пошло не так
        console.log(error)
    }
})

// Update Category
// http://localhost:5001/api/categories/:id
router.put('/:id', checkAuth, async (req, res) => {
    try {
        const { newTitle } = req.body                                                                                                               // получаем переданный в запросе 'title'
        const category = await Category.findById(req.params.id)                                                                                     // находим нужную 'category' в базе данных

        category.title = newTitle                                                                                                                   // меняем текущее значение 'title' на переданное в запросе

        await category.save()                                                                                                                       // сохраняем обновленную 'category' в базу данных

        res.json({ result: category, message: "Category was updated" })                                                                             // делаем возврат обновленной 'category' 
    } catch (error) {
        res.json({ message: "Something went wrong..." })                                                                                            // возвращаем сообщение если что-то пошло не так
        console.log(error)
    }
})

module.exports = router
