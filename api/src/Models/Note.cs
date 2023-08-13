namespace MapVault.Models;

public class Note : Entity
{
   public DateTime? CreatedAt { get; private set; }
   public DateTime? ModifiedAt { get; private set; }
   public string? Title { get; private set; }
   public string? Alias { get; private set; } // TODO: create a UK constraint
   public string[]? Categories { get; private set; }
   public string? Description { get; private set; }
   public ExceptionMessage ExceptionMessage { get; private set; }
   public string? Content { get; private set; }
   public ICollection<string> Remarks { get; private set; }

   public Note(string? title, string[]? categories, string? description, 
      string? exceptionMessage, string? content, string? alias = null, 
      Guid id = default)
   {
      Id = id;
      CreatedAt = DateTime.UtcNow;
      ModifiedAt = DateTime.UtcNow;
      Title = title;
      Alias = alias;
      Categories = categories;
      Description = description;
      ExceptionMessage = new ExceptionMessage(exceptionMessage);
      Content = content;
      Remarks = new List<string>();
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
      Remarks = new List<string>();
   }

   public void HighlightExceptionMessage(IEnumerable<string> valuable)
   {
      ExceptionMessage.RegisterValuableFragments(valuable);
   }

   public void ResetExceptionMessageHighlights()
   {
      ExceptionMessage.ResetValuableFragments();
   }

   public void AddRemark(string remark)
   {
       // TODO: append remarks in a "Remark" session and with <li> tags
       Remarks ??= new List<string>();
       Remarks.Add($"<br>{remark}</br>");
       Content += "\n" + remark;
   }
}
