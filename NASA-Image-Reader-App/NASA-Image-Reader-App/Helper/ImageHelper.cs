namespace NASA_Image_Reader_App.Helper
{
    public class ImageHelper : IImageHelper
    {
        private readonly HttpClient _httpClient;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly ILogger<ImageHelper> _logger;

        public ImageHelper(IHttpClientFactory httpClientFactory, IWebHostEnvironment webHostEnvironment, ILogger<ImageHelper> logger)
        {
            _httpClient = httpClientFactory.CreateClient();
            _webHostEnvironment = webHostEnvironment;
            _logger = logger;
        }

        public async Task DownloadImage(string imageUrl, string fileName, string directoryName = "")
        {
            try
            {
                using (HttpResponseMessage response = await _httpClient.GetAsync(imageUrl))
                {
                    if (response.IsSuccessStatusCode)
                    {
                        using (Stream imageStream = await response.Content.ReadAsStreamAsync())
                        {
                            var imagepath = Path.Combine(_webHostEnvironment.ContentRootPath, $"Content/NASA-Images/{fileName}");
                            if (!string.IsNullOrEmpty(directoryName))
                            {
                                var folder = Path.Combine(_webHostEnvironment.ContentRootPath, $"Content/NASA-Images/{directoryName}");
                                if (!Directory.Exists(folder))
                                {
                                    Directory.CreateDirectory(folder);
                                }
                                imagepath = Path.Combine(_webHostEnvironment.ContentRootPath, $"Content/NASA-Images/{directoryName}/{fileName}");
                            }
                            using (FileStream fileStream = new FileStream(imagepath, FileMode.Create))
                            {
                                await imageStream.CopyToAsync(fileStream);
                            }
                        }
                    }
                    else
                    {
                        _logger.LogError($"Failed to download image {imageUrl}. Status code: {response.StatusCode}");
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"An error occurred while downloading image {imageUrl}: {ex.Message}");
            }
        }

        public string[] GetMarsRoverPhotosByDate(string directoryName)
        {
            try
            {
                string directorypath = Path.Combine(_webHostEnvironment.ContentRootPath, $"Content/NASA-Images/{directoryName}");
                string[] files = Directory.GetFiles(directorypath);
                return files.Select(fileName => $"app-content/{directoryName}/{Path.GetFileName(fileName)}").ToArray();

            }
            catch (Exception ex)
            {
                _logger.LogError($"An error occurred while fetching image from directory {directoryName}: {ex.Message}");
            }
            return Array.Empty<string>();
        }
    }
}
