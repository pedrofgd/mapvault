using MapVault.Models;
using MongoDB.Bson.Serialization;

namespace MapVault.Data.Mappings;

public class UserMap : DatabaseMap
{
    public static UserMap Map => new();
    
    public override void Fields()
    {
        BsonClassMap.RegisterClassMap<User>(map =>
        {
            map.AutoMap();
            map.SetIgnoreExtraElements(true);
        });
    }
}