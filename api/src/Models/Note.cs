namespace MapVault.Models;

public class Note : Entity
{
   public DateTime CreatedAt { get; private set; }
   public DateTime ModifiedAt { get; private set; }
   public string? Title { get; private set; }
   public string[]? Categories { get; private set; }
   public string? ExceptionMessage { get; private set; }
   public string? Content { get; private set; }
   
   public Note(string? title, string[]? categories,
      string? exceptionMessage, string? content, Guid id = default)
   {
      Id = id;
      CreatedAt = DateTime.UtcNow;
      ModifiedAt = DateTime.UtcNow;
      Title = title;
      Categories = categories;
      ExceptionMessage = exceptionMessage;
      Content = content;
   }

   public void Update(string? title, string[]? categories, 
      string? exceptionMessage, string? content)
   {
      ModifiedAt = DateTime.UtcNow;
      Title = title;
      Categories = categories;
      ExceptionMessage = exceptionMessage;
      Content = content;
   }
}