namespace MapVault.Dtos;

public class CreateRemarkRequestDto
{
    public Guid NoteId { get; set; }
    public string? Remark { get; set; }
}