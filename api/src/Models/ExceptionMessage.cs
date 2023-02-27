namespace MapVault.Models;

public class ExceptionMessage
{
    public string? Message { get; private set; }
    public string[]? Valuables { get; private set; }

    public ExceptionMessage(string? message)
    {
        Message = message;
    }

    public void RegisterValuableFragments(string[] valuable) =>
        Valuables = valuable;
}