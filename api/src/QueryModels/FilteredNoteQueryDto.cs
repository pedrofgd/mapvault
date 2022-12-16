namespace QueryModels;

public class FilteredNoteQueryDto
{
   public Guid Id { get; private set; }
   public string? Title { get; private set; }
   public string[]? Categories { get; private set; }
   public string? ExceptionMessage { get; private set; }
}