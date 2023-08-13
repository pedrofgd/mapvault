namespace MapVault.Dtos;

public class DefaultErrorResponse
{
    public DefaultErrorResponse(string errorMessage)
    {
        ErrorMessage = errorMessage;
    }

    private string ErrorMessage { get; }
}