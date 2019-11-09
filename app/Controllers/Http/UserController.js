'use strict'
const User = use('App/Models/User');

class UserController {

    async online({ params, request, response }) {
        try {
            let users = await User.query().where('id', '<>', params.user_id_active).fetch();
            return response.status(201).json({ "users": users });
        } catch (error) {
            return response.status(500).json({ "error": error.message });
        }
    }
    async login({ request, auth, response }) {
        let { email, password } = request.all();
        try {
            if (await auth.attempt(email, password)) {
                let user = await User.findBy('email', email);
                user.status = 'is-primary';
                await user.save();
                let token = await auth.generate(user)
                Object.assign(user, token)
                return response.json(user)
            }
        }
        catch (e) {
            console.log(e)
            return response.json({ message: 'You are not registered!' })
        }
    }
    async logout({request,response}){
        const {user_id} = request.only('user_id');
        const user = await User.findOrFail(user_id);
        user.status = 'is-danger';
        await user.save();
        return response.json({"user":user});
    }   
    async login({ request, auth, response }) {
        let { email, password } = request.all();
        try {
            if (await auth.attempt(email, password)) {
                let user = await User.findBy('email', email);
                user.status = 'is-primary';
                await user.save();
                let token = await auth.generate(user)
                Object.assign(user, token)
                return response.json(user)
            }
        }
        catch (e) {
            console.log(e)
            return response.json({ message: 'You are not registered!' })
        }
    }

    async register({ request, auth, response }) {
        let user = await User.create(request.all())
        let token = await auth.generate(user)
        Object.assign(user, token)
        return response.json(user)
    }
}

module.exports = UserController
