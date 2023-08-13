// issue #20
db.notes.updateMany(
    {},
    {
        $rename: {
            'CreatedAt': 'createdAt',
            'ModifiedAt': 'modifiedAt',
            'Title': 'title',
            'Categories': 'categories',
            'ExceptionMessage': 'exceptionMessage',
            'Content': 'content'
        }
    }
)