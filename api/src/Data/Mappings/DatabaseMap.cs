using MongoDB.Bson.Serialization.Conventions;

namespace MapVault.Data.Mappings;

public class DatabaseMap
{
    protected DatabaseMap()
    {
        var packGuid = new ConventionPack { new GuidAsStringRepresentationConvention() };
        var packCamel = new ConventionPack { new CamelCaseElementNameConvention() };
        
        ConventionRegistry.Register("GUID as string convention", packGuid, _ => true);
        ConventionRegistry.Register("camelCase convention", packCamel, _ => true);
        
        ConventionRegistry.Remove("__defaults__");
        ConventionRegistry.Register("__defaults__", DefaultConventionPack.Apply(), _ => true);
    }

    public virtual void Fields() {}
}