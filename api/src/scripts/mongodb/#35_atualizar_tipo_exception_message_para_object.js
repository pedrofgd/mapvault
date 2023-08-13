// issue #35
db.notes.updateMany(
    {},
    [
        {
            $addFields: {
                exceptionMessage: {
                    message: "$exceptionMessage",
                    valuables: []
                }
            }
        }
    ]
)