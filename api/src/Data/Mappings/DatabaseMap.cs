using MongoDB.Bson.Serialization.Conventions;

namespace MapVault.Data.Mappings;

public class DatabaseMap
{
    public DatabaseMap()
    {
        var packGuid = new ConventionPack { new GuidAsStringRepresentationConvention() };
        var packCamel = new ConventionPack { new CamelCaseElementNameConvention() };
        
        ConventionRegistry.Register("GUID as string convention", packGuid, _ => true);
        ConventionRegistry.Register("camelCase convention", packCamel, _ => true);
    }

    public virtual void Fields() {}
}