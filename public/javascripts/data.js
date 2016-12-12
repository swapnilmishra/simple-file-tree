const data = [
    {
        _id: 1,
        type : 'folder',
        name : 'components',
        childrens : [
            {_id : 2, type : 'file',name : 'recharge.js'},
            {_id : 3, type : 'file',name : 'payments.js'},
            {_id : 3, type : 'folder',name : 'payments', childrens: [
                {_id : 2, type : 'file',name : 'bourbon.js'},
                {_id : 3, type : 'file',name : 'parle.js'}
            ]}
        ]
    },
    {
        _id: 4,
        type : 'file',
        name : 'package.json'
    },
    {
        _id: 4,
        type : 'folder',
        name : 'node_modules',
        childrens : [
            {_id : 2, type : 'file',name : 'rxjs.js'},
            {_id : 3, type : 'file',name : 'react.js'}
        ]
    },
    {
        _id: 5,
        type : 'folder',
        name : '__tests__',
        childrens : [
            {_id : 6, type : 'file',name : 'app.test.js'}
        ]
    },
    {
        _id: 6,
        type : 'folder',
        name : 'images',
        childrens : [
            {_id : 6, type : 'file',name : 'logo.png'},
            {_id : 6, type : 'file',name : 'favicon.ico'}
        ]
    }
]

module.exports = {
    data
}