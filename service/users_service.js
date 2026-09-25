////customErrorClass
/////////users_service.js

import mysql from 'mysql2/promise'
process.loadEnvFile()
const connection = await mysql.createConnection(
    {
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    }
)
console.log('conection to DB: succesful')

class AppError extends Error {
    constructor(message, status){
        super(message)
        this.status = status
    }
}



/////////users_service.js

export const findUserById = async (id)=>{

    //const user = users.find( (user)=> user.id === id)
    const [row] = await connection.query('SELECT userId ,name FROM users WHERE userId = ?', [id])
    const user = row[0]
    if(!user){
        throw new AppError('Usuario no encontrado', 404)
    }
    return user 
}
//users_service.js

export async function createUser(name){
    const nameNoSpace = name?.trim()
    if(nameNoSpace=== undefined || nameNoSpace.length === 0){
        throw new AppError('Nombre requerido', 400)
    }
    const [newUser] = await connection.query(
        'INSERT INTO Users (name) VALUES (?)',
        [nameNoSpace])

    return {
        userId: newUser.insertId,
        name: nameNoSpace
    }
    
}
//users_service.js
export async function updateUser(id, name){
    const [rows] = await connection.query('SELECT name FROM Users WHERE userId = ?', [id])
    const [updateUser] = await connection.query('UPDATE Users SET name = ? WHERE userId = ?', [name, id])
    if(updateUser.affectedRows === 0){
        throw new AppError('user not found', 404)
    }
    const user = rows[0]
    const oldName = user.name

    return oldName
}
//users_service.js
export async function deleteUserById(id){
    const [rows] = await connection.query('SELECT name FROM Users WHERE userId = ?', [id])
    const [deletUser] = await connection.query('DELETE FROM Users WHERE userId = ?', [id])

    if(deletUser.affectedRows === 0){
        throw new AppError('User not found', 404)
    }
    const user = rows[0]
    return user;
}