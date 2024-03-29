using MongoDB.Bson.Serialization.Conventions;

namespace MapVault.Data.Mappings;

public class DefaultConventionPack : IConventionPack
{
    private static readonly IConventionPack DefaultPack = new DefaultConventionPack();

    private DefaultConventionPack()
    {
        Conventions = new List<IConvention>
        {
            new ReadWriteMemberFinderConvention(),
            new NamedIdMemberConvention("Id", "id", "_id"),
            new NamedExtraElementsMemberConvention(new[] { "ExtraElements" }),
            new IgnoreExtraElementsConvention(false),
            //new ImmutableTypeClassMapConvention(),
            new NamedParameterCreatorMapConvention(),
            new StringObjectIdIdGeneratorConvention(),
            new LookupIdGeneratorConvention()
        };
    }

    public IEnumerable<IConvention> Conventions { get; }

    public static IConventionPack Apply()
    {
        return DefaultPack;
    }
}