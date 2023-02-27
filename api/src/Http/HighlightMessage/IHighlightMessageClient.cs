namespace MapVault.Http.HighlightMessage;

public interface IHighlightMessageClient
{
    Task<string[]> GetValuableFragments(string message);
}