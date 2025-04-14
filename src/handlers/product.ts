import { Request, Response } from "express";
import Product from "../models/Product.model";



export const getProducts = async (req: Request, res: Response) =>{
    const products = await Product.findAll({
        attributes: { exclude : ['createdAt', 'updatedAt']}
    })
    res.json({ data: products });
}

export const getProductById = async (req: Request, res: Response) =>{
    const {id} = req.params
    const product = await Product.findByPk(id)
    if(!product){
        return res.status(404).json({
            error: 'producto no encontrado'
        })
    }
    res.json({data: product})
}


export const createProduct = async (req: Request, res: Response) => {
    const product = await Product.create(req.body);
    res.status(201).json({ data: product });
};

export const updateProduct = async (req: Request, res: Response) =>{
    // VERIFICAR QUE EXISTA
    const {id} = req.params
    const product = await Product.findByPk(id)
    if(!product){
        return res.status(404).json({
            error: 'producto no encontrado'
        })
    }
    // ACTUALIZAR
    await product.update(req.body)
    await product.save()

    res.json({data: product})
}

export const updateAviability = async (req: Request, res: Response) =>{
    // VERIFICAR QUE EXISTA
    const {id} = req.params
    const product = await Product.findByPk(id)
    if(!product){
        return res.status(404).json({
            error: 'producto no encontrado'
        })
    }
    // ACTUALIZAR
    product.aviability = !product.dataValues.aviability
    await product.save()
    res.json({data: product})
}

export const deleteProduct = async (req: Request, res: Response) =>{
    // VERIFICAR QUE EXISTA
    const {id} = req.params
    const product = await Product.findByPk(id)
    if(!product){
        return res.status(404
            
        ).json({
            error: 'producto no encontrado'
        })
    }
    await product.destroy()
    res.json({data: 'producto eliminado' })
}