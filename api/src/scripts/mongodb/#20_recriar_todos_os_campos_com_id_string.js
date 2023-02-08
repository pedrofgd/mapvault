// issue #20
// Para cada documento, criar um novo com um _id GUID como string e remover o antigo
db.notes.find().forEach(function(doc){
    var oldDocId = doc._id;
    doc._id=UUID().toString('hex').replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, '$1-$2-$3-$4-$5');
    db.notes.insertOne(doc);
    db.notes.deleteOne({_id: oldDocId});
});