const pool = require("../../config/database");

module.exports = {
    // Create a new product
    createProduct: (data, callBack) => {
        pool.query(
            `INSERT INTO products (title, description, creator_id, media, category_id) 
             VALUES (?, ?, ?, ?, ?)`,
            [data.title, data.description, data.creator_id, data.media, data.category_id],
            (error, result) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result);
            }
        );
    },

    // Get all products
    getAllProducts: (callBack) => {
        const query = `
            SELECT 
                p.id,
                p.title,
                p.description,
                p.media,
                m.nama AS creator_name,
                c.category AS category_name
            FROM 
                products p
            JOIN 
                mahasiswa m ON p.creator_id = m.nim
            JOIN 
                categories c ON p.category_id = c.id
        `;
    
        pool.query(query,(error, results) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        });
    },
    

    // Get a single product by ID
    getProductById: (id, callBack) => {
        pool.query(
            `
            SELECT 
                p.id,
                p.title,
                p.description,
                p.media,
                m.nama AS creator_name,
                c.category AS category_name
            FROM 
                products p
            JOIN 
                mahasiswa m ON p.creator_id = m.nim
            JOIN 
                categories c ON p.category_id = c.id
            WHERE 
                p.id = ?
            `,
            [id],
            (error, result) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result[0]); // Assuming the ID is unique, only one result will be returned
            }
        );
    },
    // Update a product by ID
    updateProduct: (id, data, callBack) => {
        pool.query(
            `UPDATE products 
             SET title = ?, description = ?, creator_id = ?, media = ?, category_id = ? 
             WHERE id = ?`,
            [data.title, data.description, data.creator_id, data.media, data.category_id, id],
            (error, result) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result);
            }
        );
    },

    // Delete a product by ID
    deleteProduct: (id, callBack) => {
        pool.query(
            `DELETE FROM products WHERE id = ?`,
            [id],
            (error, result) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result);
            }
        );
    },
};
