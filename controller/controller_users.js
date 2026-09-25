////////////////////////controller_users.js
import {
    findUserById, 
    createUser,
    updateUser,
    deleteUserById
} from '../service/users_service.js'

export const controllerErrorHandler = (controller)=>{
    return async (req, res, next)=>{
        try{
            await controller(req, res, next)
        }
        catch(error){
            next(error)
        }
    }
}

//controller_user.js
export const getUser = async (req, res)=>{
    const id = parseInt(req.params.id);
    const user = await findUserById(id)
    res.status(200).json(user)
}
////////////
export const getStatus = (req, res)=>{
    res.status(200).json({message : 'ok', uptime: process.uptime()})
}
/////////////////////
export const postAddUser = async(req, res)=>{
    const {name} = req.body;
    const newUser = await createUser(name)
    res.status(201).json({message : ` usuario ${name} creado con exito tu  id es ${newUser.userId}`})
}
///////////
//controller_user.js
export const putModUser = async (req,res)=>{
    const id = parseInt(req.params.id)
    const {name} = req.body
    const getOldName = await updateUser(id, name)
    res.status(200).json({message :`usuario ${getOldName}, renombrado a ${name}`})

}
/////////////
export const deleteUser = async (req, res)=>{
    const id = parseInt(req.params.id)
    const deletedUser = await deleteUserById(id)
    res.status(200).json({message : `usuario eliminado con exito bye bye ${deletedUser.name}`})
}