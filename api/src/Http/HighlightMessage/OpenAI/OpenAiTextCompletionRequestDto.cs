// ReSharper disable InconsistentNaming
// ReSharper disable UnusedAutoPropertyAccessor.Global

namespace MapVault.Http.HighlightMessage.OpenAI;

public class OpenAiTextCompletionRequestDto
{
    public string? model { get; set; }
    public string? prompt { get; set; }
    public int temperature { get; set; }
    public int max_tokens { get; set; }
    public int top_p { get; set; }
    public int frequency_penalty { get; set; }
    public int presence_penalty { get; set; }
}