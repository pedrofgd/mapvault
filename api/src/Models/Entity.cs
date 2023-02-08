namespace MapVault.Models;

public class Entity
{
    private readonly Guid _id;
    public Guid Id
    {
        get => _id;
        protected init => _id = value == Guid.Empty ? Guid.NewGuid() : value;
    }
}