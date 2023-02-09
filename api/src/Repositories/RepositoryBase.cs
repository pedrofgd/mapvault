using MapVault.Data.MongoDb;
using MapVault.Models;
using MongoDB.Driver;

namespace MapVault.Repositories;

public abstract class RepositoryBase<TEntity> where TEntity : Entity
{
    private readonly IMongoCollection<TEntity> _collection;

    public RepositoryBase(string collectionName)
    {
        var mongoDatabase = MongoDbConnectionFactory.GetMongoDatabase();
        _collection = mongoDatabase.GetCollection<TEntity>(collectionName);
    }

    public async Task<TEntity?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var filter = Builders<TEntity>.Filter.Eq(x => x.Id, id);

        return await _collection
            .Find(filter)
            .FirstOrDefaultAsync(cancellationToken: cancellationToken);
    }

    public async Task<bool> SaveOrUpdateAsync(TEntity entity, CancellationToken cancellationToken)
    {
        var replaceOneResult = await _collection
            .ReplaceOneAsync(
                doc => doc.Id == entity.Id,
                entity,
                new ReplaceOptions { IsUpsert = true },
                cancellationToken: cancellationToken);

        if (replaceOneResult.MatchedCount == 1)
            return replaceOneResult.ModifiedCount == 1;

        return replaceOneResult.UpsertedId != null;
    }

    public async Task<bool> DeleteByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var deleteFilter = Builders<TEntity>.Filter.Eq(x => x.Id, id);
        var deleteResult = await _collection.DeleteOneAsync(deleteFilter, cancellationToken);

        return deleteResult.DeletedCount == 1;
    }
}