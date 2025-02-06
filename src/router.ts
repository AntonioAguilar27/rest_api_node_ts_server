import {Router} from 'express'
import { createProduct, getProducts, getProductById, updateProduct, updateAviability, deleteProduct } from './handlers/product'
import { body, param } from 'express-validator'
import { handleInputErrors } from './middleware'


const router = Router()

// Routing 

router.get('/', getProducts)

router.get('/:id', 
    param('id').isInt().withMessage('id no valido'),
    handleInputErrors,
    getProductById
)

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

router.patch('/:id', 
    param('id').isInt().withMessage('id no valido'),
    handleInputErrors,
    updateAviability
)

router.delete('/:id',
    param('id').isInt().withMessage('id no valido'),
    handleInputErrors,
    deleteProduct
)


export default router