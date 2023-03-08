using MapVault.Models;

namespace MapVault.Repositories;

public class UsersRepository : RepositoryBase<User>, IUsersRepository
{
    private readonly ILogger<UsersRepository> _logger;

    public UsersRepository(ILogger<UsersRepository> logger) : 
        base(CollectionConstants.UsersCollection)
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }
}