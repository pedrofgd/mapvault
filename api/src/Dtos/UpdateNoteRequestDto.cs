namespace MapVault.Dtos;

public class UpdateNoteRequestDto
{
    public Guid Id { get; set; }
    public string? Title { get; set; }
    public string[]? Categories { get; set; }
    public string? Description { get; set; }
    public string? ExceptionMessage { get; set; }
    public bool HighlightMessage { get; set; }
    public string? Content { get; set; }
}