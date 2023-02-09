namespace MapVault.Dtos;

public class DefaultErrorResponse
{
   public string ErrorMessage { get; set; }

   public DefaultErrorResponse(string errorMessage)
   {
      ErrorMessage = errorMessage;
   }
}