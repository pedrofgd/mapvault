using System.Net.Http.Headers;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace MapVault.Http.HighlightMessage.OpenAI;

public class OpenAiClient : IHighlightMessageClient
{
    private readonly JsonSerializerSettings _jsonSettings = new()
    {
        ContractResolver = new CamelCasePropertyNamesContractResolver()
    };

    private readonly string PromptTemplate =
        "select 3 most important fragments in order to understand the following exception message" + 
            "and return as plain text, separated by ';' and with no additional comments";

    private readonly OpenAiSettings _settings;

    public OpenAiClient(IConfiguration configuration)
    {
        var settings = configuration.GetSection(OpenAiSettings.OpenAiConfig).Get<OpenAiSettings>();
        ArgumentNullException.ThrowIfNull(settings);
        _settings = settings;
    }
    
    public async Task<string[]> GetValuableFragments(string message)
    {
        var httpClient = new HttpClient();

        var url = $"{_settings.BaseUrl}/v1/completions";

        var content = new OpenAiTextCompletionRequestDto
        {
            model = "text-davinci-003",
            prompt = $"{PromptTemplate}:{message}",
            temperature = 1,
            max_tokens = 1000,
            top_p = 1,
            frequency_penalty = 0,
            presence_penalty = 0
        };
        var jsonContent = JsonConvert.SerializeObject(content, _jsonSettings);

        var requestBody = new StringContent(jsonContent, Encoding.UTF8, "application/json");
        var request = new HttpRequestMessage(HttpMethod.Post, url);
        request.Content = requestBody;
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _settings.ApiKey);
            
        var response = await httpClient.SendAsync(request);
        var responseContent = await response.Content.ReadAsStringAsync();
        var responseBody = JsonConvert.DeserializeObject<OpenAiTextCompletionResponseDto>(responseContent);

        var valuable = responseBody?.choices?.First().text?.Replace("\n", "");
        return valuable?.Split(";")!;
    }
}