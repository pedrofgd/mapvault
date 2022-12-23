namespace Models;

public class Note
{
   public Note(Guid id, string? title, string[]? categories,
      string? exceptionMessage, string? content)
   {
      Id = id;
      Title = title;
      Categories = categories;
      ExceptionMessage = exceptionMessage;
      Content = content;
   }

   public Guid Id { get; private set; }
   public string? Title { get; private set; }
   public string[]? Categories { get; private set; }
   public string? ExceptionMessage { get; private set; }
   public string? Content { get; private set; }
}