namespace MapVault.QueryModels;

public class SummaryNoteQueryDto
{
    public Guid Id { get; set; }
    public string? Title { get; set; }
    public string[]? Categories { get; set; }
    public string? Description { get; set; }
    public string? ExceptionMessage { get; set; }
}