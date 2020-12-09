const bcrypt = require('bcrypt')

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db')
        const {username, password} = req.body

        const user = await db.check_user(username)
        if(user[0]){
            return res.status(409).send('User already exists')
        }
        
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        
        const [newUser] = await db.create_user([username, hash])
        req.session.user = {
            userId: newUser.user_id,
            username: newUser.username
        }
        res.status(200).send(req.session.user)
    },
    login: async (req, res) => {
        const db = req.app.get('db')
        const {username, password} = req.body
        const [foundUser] = await db.check_user(username)
        if(!foundUser){
            return res.status(401).send('Incorrect login info')
        }
        const authenticated = bcrypt.compareSync(password, foundUser.password)
        if(authenticated){
            req.session.user = {
                userId: foundUser.user_id,
                username: foundUser.username
            }
            res.status(200).send(req.session.user)
        }
        else{
            res.status(401).send('Incorrect login info')
        }
    },
    newPost: async (req, res) => {
        const db = req.app.get('db')
        const {description, img} = req.body
        const userId = req.session.user.userId
        console.log(userId, description, img)
        await db.add_post([description, img, userId])
        res.sendStatus(200)
    },
    getPosts: (req, res) => {
        const db = req.app.get('db')
        db.get_all_posts().then((posts) => res.status(200).send(posts)).catch(err => console.log(err))
    },
    getUserPosts: (req, res) => {
        const db = req.app.get('db')
        const userId = req.session.user.userId
        db.get_user_posts(userId).then((posts) => res.status(200).send(posts)).catch(err => console.log(err))
    },
    getIndivPosts: async (req, res) => {
        try{
            const db = req.app.get('db')
            const {id} = req.params
            const [post] = await db.get_one_post(+id)
            console.log(post)
            res.status(200).send(post)
        }
        catch(err){
            console.log(err)
        }
    },
    editPost: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        const {description} = req.body
        db.edit_post(id, description).then((post) => res.status(200).send(post))
    },
    deletePost: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        console.log(id)
        db.delete_post(+id)
        res.sendStatus(200)
    }
}