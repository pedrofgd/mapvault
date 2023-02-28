namespace MapVault.Models;

public class ExceptionMessage
{
    public string? Message { get; private set; }
    public IEnumerable<string>? Valuables { get; private set; }

    public ExceptionMessage(string? message)
    {
        Message = message;
    }

    public void RegisterValuableFragments(IEnumerable<string> valuable) =>
        Valuables = valuable;

    public void ResetValuableFragments() =>
        Valuables = null;
}