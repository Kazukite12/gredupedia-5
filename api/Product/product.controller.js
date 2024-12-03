const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} = require('./product.service');

module.exports = {
    // Create a new product
    createProduct: (req, res) => {
        const body = req.body;
        try {
            createProduct(body, (err, results) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({
                        message: "Database connection error",
                    });
                }
                return res.status(201).json({
                    message: "Product created successfully",
                    data: results,
                });
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                message: "Error creating product",
            });
        }
    },

    // Get all products
    getAllProducts: (req, res) => {
        try {
            getAllProducts((err, results) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({
                        message: "Database connection error",
                    });
                }
                return res.status(200).json({
                    message: "Products retrieved successfully",
                    data: results,
                });
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                message: "Error retrieving products",
            });
        }
    },

    // Get product by ID
    getProductById: (req, res) => {
        const id = req.params.id;
        try {
            getProductById(id, (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({
                        message: "Database connection error",
                    });
                }
                if (!result) {
                    return res.status(404).json({
                        message: "Product not found",
                    });
                }
                return res.status(200).json({
                    message: "Product retrieved successfully",
                    data: result,
                });
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                message: "Error retrieving product",
            });
        }
    },

    // Update product by ID
    updateProduct: (req, res) => {
        const id = req.params.id;
        const body = req.body;
        try {
            updateProduct(id, body, (err, results) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({
                        message: "Database connection error",
                    });
                }
                if (results.affectedRows === 0) {
                    return res.status(404).json({
                        message: "Product not found",
                    });
                }
                return res.status(200).json({
                    message: "Product updated successfully",
                });
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                message: "Error updating product",
            });
        }
    },

    // Delete product by ID
    deleteProduct: (req, res) => {
        const id = req.params.id;
        try {
            deleteProduct(id, (err, results) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({
                        message: "Database connection error",
                    });
                }
                if (results.affectedRows === 0) {
                    return res.status(404).json({
                        message: "Product not found",
                    });
                }
                return res.status(200).json({
                    message: "Product deleted successfully",
                });
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                message: "Error deleting product",
            });
        }
    },
};
