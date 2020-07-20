const config={
    production:{
        SECRET:process.env.SECRET,
        DATABASE:process.env.MONGODB_URI
    },
    default:{
        DATABASE:'mongodb://localhost:27017/booksShelf'
    }
}

exports.get=function get(env){
    return config[env]||config.default
}