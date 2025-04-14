import {Router} from 'express'
import { createProduct, getProducts, getProductById, updateProduct, updateAviability, deleteProduct } from './handlers/product'
import { body, param } from 'express-validator'
import { handleInputErrors } from './middleware'


const router = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The product ID
 *           example: 1
 *         name:
 *           type: string
 *           description: The product name
 *           example: Monitor curvo de 49 pulgadas
 *         price:
 *           type: number
 *           description: The product price
 *           example: 300
 *         aviability:
 *           type: boolean
 *           description: The product aviability
 *           example: true
 */

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: get a list of products
 *          tags:
 *                - Products
 *          description: return a list of products
 *          responses:
 *              200:
 *                  description: succesfuly response
 *                  content:
 *                      application/json:
 *                            schema:
 *                                type: array
 *                                items:
 *                                    $ref: '#/components/schemas/Product'
 * 
 * 
 * 
 */


router.get('/', getProducts)
/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *      summary: get a product by id 
 *      tags:
 *          - Products
 *      description: return a product based on its unique id 
 *      parameters: 
 *        - in: path
 *          name: id
 *          description: the id of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description : succesful response
 *              content:
 *                  application/json:
 *                        schema:
 *                            $ref: '#/components/schemas/Product'
 *          404: 
 *              description: not found
 *          400: 
 *              description : bad request - invalid id  
 */


router.get('/:id', 
    param('id').isInt().withMessage('id no valido'),
    handleInputErrors,
    getProductById
)

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Creates a new product
 *     tags:
 *       - Products
 *     description: Returns a new record in the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "monitor curvo"
 *               price:
 *                 type: number
 *                 example: 399
 *     responses:
 *       201:
 *           description: succesfull response
 *           content: 
 *               application/json:
 *                     schema:
 *                         $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request - invalid input data
 */

router.post('/', 
      //validacion
    body("name")
        .notEmpty().withMessage("el nombre de producto no puede ser vacio"),
    body("price")
        .isNumeric().withMessage("valor no valido")
        .notEmpty().withMessage("el precio no puede ser vacio")
        .custom(value => value > 0).withMessage("precio no valido"),
        handleInputErrors,
    createProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Updates a product with user input
 *     tags: 
 *       - Products
 *     description: Returns the updated product
 *     parameters: 
 *       - in: path
 *         name: id
 *         description: The ID of the product to update
 *         required: true 
 *         schema: 
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "monitor curvo"
 *               price:
 *                 type: number
 *                 example: 399
 *               aviability:
 *                 type: boolean
 *                 example: true
 *     responses: 
 *       200:
 *         description: Successful response
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400: 
 *         description: Bad request - invalid ID or invalid input data
 *       404: 
 *         description: Product not found
 */


router.put('/:id', 
          //validacion
        body("name")
          .notEmpty().withMessage("el nombre de producto no puede ser vacio"),
        body("price")
          .isNumeric().withMessage("valor no valido")
          .notEmpty().withMessage("el precio no puede ser vacio")
          .custom(value => value > 0).withMessage("precio no valido"),
        body('aviability')
          .isBoolean().withMessage('valor para disponibilidad no valido'),
        param('id').isInt().withMessage('id no valido'),
    handleInputErrors,
    updateProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Update product aviability
 *     tags: 
 *       - Products
 *     description: Returns the updated aviability
 *     parameters: 
 *       - in: path
 *         name: id
 *         description: The ID of the product to update
 *         required: true
 *         schema: 
 *           type: integer
 *     responses: 
 *       200:
 *         description: Successful response
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/product'
 *       400: 
 *         description: Bad request - invalid ID or invalid input data
 *       404: 
 *         description: Product not found
 */


router.patch('/:id', 
    param('id').isInt().withMessage('id no valido'),
    handleInputErrors,
    updateAviability
)


/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: deletesa a product  by a given id
 *     tags: 
 *       - Products
 *     description: Returns a confirmation message
 *     parameters: 
 *       - in: path
 *         name: id
 *         description: The ID of the product to delete
 *         required: true
 *         schema: 
 *           type: integer
 *     responses: 
 *       200:
 *         description: Successful response
 *         content: 
 *           application/json:
 *             schema:
 *               type: string
 *               value: 'producto eliminado'
 *       400: 
 *         description: Bad request - invalid ID or invalid input data
 *       404: 
 *         description: Product not found
 */

router.delete('/:id',
    param('id').isInt().withMessage('id no valido'),
    handleInputErrors,
    deleteProduct
)


export default router