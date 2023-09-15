import env from './environment'

export default class TodoService {
    static getTodo(obj) {
        console.log("ulr:", `${env.backend_url}${env.todo_endpoint}`)
        return fetch(`${env.backend_url}${env.todo_endpoint}`, {
            headers: {
                "Content-Type": 'application/json',
            },
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(obj)
        })
    }
    
    static postTodo(obj) {
        return fetch(`${env.backend_url}${env.todo_endpoint}${env.todo_create}`, {
            headers: {
                "Content-Type": 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(obj),
            credentials: 'include'
        })
    }

    static putTodo(id,  obj) {
        return fetch(`${env.backend_url}${env.todo_endpoint}${id}`, {
            headers: {
                "Content-Type": 'application/json',
            },
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify(obj)
        })
    }

    static deleteTodo(id) {
        return fetch(`${env.backend_url}${env.todo_endpoint}${id}`, {
            headers: {
                "Content-Type": 'application/json',
            },
            method: 'DELETE',
            credentials: 'include',
        })
    }
}