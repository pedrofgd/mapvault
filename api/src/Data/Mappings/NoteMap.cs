using MapVault.Models;
using MongoDB.Bson.Serialization;

namespace MapVault.Data.Mappings;

public class NoteMap : DatabaseMap
{
    public static NoteMap Map => new();

    public override void Fields()
    {
        BsonClassMap.RegisterClassMap<Note>(map =>
        {
            map.AutoMap();
            map.SetIgnoreExtraElements(true);
        });
    }
}