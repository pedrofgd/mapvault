namespace MapVault.Models;

public class User : Entity
{
    public string Email { get; set; }
    public string Nome { get; set; }

    public User(string email, string nome, Guid id = default)
    {
        Id = id;
        Email = email;
        Nome = nome;
    }
}