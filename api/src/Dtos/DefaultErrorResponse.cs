namespace MapVault.Dtos;

public class DefaultErrorResponse
{
   private string ErrorMessage { get; set; }

   public DefaultErrorResponse(string errorMessage)
   {
      ErrorMessage = errorMessage;
   }
}