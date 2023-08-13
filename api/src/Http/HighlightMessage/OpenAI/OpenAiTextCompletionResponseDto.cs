// ReSharper disable InconsistentNaming
// ReSharper disable UnusedMember.Global

namespace MapVault.Http.HighlightMessage.OpenAI;

public class OpenAiTextCompletionResponseDto
{
    public string? id { get; set; }
    public string? @object { get; set; }
    public int created { get; set; }
    public string? model { get; set; }
    public IEnumerable<OpenAiResponseChoice>? choices { get; set; }
    public OpenAiResponseUsage? usage { get; set; }
}

public class OpenAiResponseChoice
{
    public string? text { get; set; }
    public int index { get; set; }
    public string? logprobs { get; set; }
    public string? finish_reason { get; set; }
}

public class OpenAiResponseUsage
{
    public int prompt_tokens { get; set; }
    public int completion_tokens { get; set; }
    public int total_tokens { get; set; }
}