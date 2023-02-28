namespace MapVault.Http.HighlightMessage;

public interface IHighlightMessageClient
{
    Task<IEnumerable<string>> GetValuableFragments(string message);
}