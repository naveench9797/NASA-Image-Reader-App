using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NASA_Image_Reader_App.Helper;
using System.Net;

namespace NASA_Image_Reader_App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MarsRoverPhotosController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly IImageHelper _imageHelper;
        private readonly ILogger<MarsRoverPhotosController> _logger;

        public MarsRoverPhotosController(IHttpClientFactory httpClientFactory, ILogger<MarsRoverPhotosController> logger, IImageHelper imageHelper)
        {
            _httpClient = httpClientFactory.CreateClient();
            _logger = logger;
            _imageHelper = imageHelper;
        }

        [HttpGet("DownloadMarsRoverPhotosByDate")]
        public async Task<string> DownloadMarsRoverPhotosByDate(DateTime fetchdate)
        {
            try
            {
                if (fetchdate == DateTime.MinValue)
                {
                    return $"Invalid Date: {HttpStatusCode.BadRequest}";
                }
                string apiKey = "xCBWTVghWvjIziSkhu0x8oRuKJTsbxIzltUEjVfE";
                string rover = "perseverance"; // Or 'curiosity' or 'opportunity'
                string apiUrl = $"https://api.nasa.gov/mars-photos/api/v1/rovers/{rover}/latest_photos?api_key={apiKey}&earth_date={fetchdate.ToString("yyyyy-MM-dd")}";

                HttpResponseMessage response = await _httpClient.GetAsync(apiUrl);

                if (response.IsSuccessStatusCode)
                {
                    string responseData = await response.Content.ReadAsStringAsync();
                    // Parse JSON response to extract photo URLs
                    // Example: using Newtonsoft.Json NuGet package
                    dynamic json = Newtonsoft.Json.JsonConvert.DeserializeObject(responseData);

                    foreach (var photo in json.latest_photos)
                    {
                        string imageUrl = photo.img_src;
                        string imageId = photo.id;
                        string fileName = $"{imageId}.jpg";
                        await _imageHelper.DownloadImage(imageUrl, fileName, fetchdate.ToString("MM-dd-yyyyy"));
                    }

                    _logger.LogInformation("Photos downloaded successfully.");
                    return "Photos downloaded successfully.";
                }
                else
                {
                    return $"Failed to fetch photos. Status code: {response.StatusCode}";
                }
            }
            catch (Exception ex)
            {
                return $"An error occurred: {ex.Message}";
            }
        }

        [HttpGet("GetMarsRoverPhotosByDate")]
        public IActionResult GetMarsRoverPhotosByDate(DateTime fetchdate)
        {
            return Ok(_imageHelper.GetMarsRoverPhotosByDate(fetchdate.ToString("MM-dd-yyyyy")));
        }
    }
}
