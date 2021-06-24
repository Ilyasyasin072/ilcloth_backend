const AdminType = require('../models/admin_type')

const index = async(req, res) => {
    res.json({
        link: 'admin type index'
    })
}

const store = async(req, res) => {
    res.json({
        link: 'admin type store'
    })
}

module.exports = {
    index, 
    store
}