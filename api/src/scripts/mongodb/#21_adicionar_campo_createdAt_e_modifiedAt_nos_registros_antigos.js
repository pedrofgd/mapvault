// issue #21
db.notes.updateMany(
    { $and: [
            {'createdAt': {$exists: false}},
            {'modifiedAt': {$exists: false}}
        ]
    },
    { $set: { 'createdAt': null, 'modifiedAt': null} }
)