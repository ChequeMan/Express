//////////////////users.js
import express from 'express'

import {
    getUser,
    getStatus,
    postAddUser,
    putModUser,
    deleteUser,
    controllerErrorHandler
} from '../controller/controller_users.js'

const Router = express.Router()
//import {randomUUID} from 'node:crypto'



const validateUser = (req, res, next)=>{
    if(!req.body || !req.body.name){
        return res.status(400).json({message: 'nombre necesario'})
    }
    next()
}

const validateUserId = (req, res, next)=>{
    let id = parseInt(req.params.id)
    if(!id || isNaN(id) || id <= 0){
        return res.status(400).json({message : 'id no valido'})
    }
    next()
}


Router.get('/health', getStatus);
///fines educativos pero no es util /error dentro de este CRUD
Router.get('/error', ( req, res, next)=>{
    const error = new Error('se rompio io io t-t-t-t-tod-to_todo_do... 💀')
    next(error)
})

Router.get('/:id', controllerErrorHandler(getUser));

Router.post('/', validateUser, controllerErrorHandler(postAddUser));
////router middlewares agregados
Router.put('/:id', validateUserId, validateUser, controllerErrorHandler(putModUser));

Router.delete('/:id',validateUserId ,controllerErrorHandler(deleteUser));

export default Router;


///Error handling
 

/////////400 → "Tu petición está mal"
/////////404 → "Lo que buscas no existe"