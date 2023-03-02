namespace MapVault.Models;

public class Note : Entity
{
   public DateTime? CreatedAt { get; private set; }
   public DateTime? ModifiedAt { get; private set; }
   public string? Title { get; private set; }
   public string[]? Categories { get; private set; }
   public string? Description { get; private set; }
   public ExceptionMessage ExceptionMessage { get; private set; }
   public string? Content { get; private set; }
   
   public Note(string? title, string[]? categories, string? description, 
      string? exceptionMessage, string? content, Guid id = default)
   {
      Id = id;
      CreatedAt = DateTime.UtcNow;
      ModifiedAt = DateTime.UtcNow;
      Title = title;
      Categories = categories;
      Description = description;
      ExceptionMessage = new ExceptionMessage(exceptionMessage);
      Content = content;
   }

   public void Update(string? title, string[]? categories, 
      string? description, string? exceptionMessage, string? content)
   {
      ModifiedAt = DateTime.UtcNow;
      Title = title;
      Categories = categories;
      Description = description;
      ExceptionMessage = new ExceptionMessage(exceptionMessage);
      Content = content;
   }

   public void HighlightExceptionMessage(IEnumerable<string> valuable)
   {
      ExceptionMessage.RegisterValuableFragments(valuable);
   }

   public void ResetExceptionMessageHighlights()
   {
      ExceptionMessage.ResetValuableFragments();
   }
}