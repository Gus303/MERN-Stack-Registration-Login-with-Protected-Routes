import Category from '../models/Category.js'; 

const addCategory = async (req, res) => {
    try {
        const { categoryName, categoryDescription } = req.body;

    const existingCategory = await Category.findOne({ categoryName });
    if (existingCategory) {
    return res.status(400).json({ success: false, message: 'Category already exists' });
    }
    const newCategory = new Category({
        categoryName,
        categoryDescription,
    });

    await newCategory.save();
    res.status(201).json({ success: true, message: 'Category added successfully'});
    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
}

export { addCategory };