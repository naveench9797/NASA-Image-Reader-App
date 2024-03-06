namespace NASA_Image_Reader_App.Helper
{
    public interface IImageHelper
    {
        Task DownloadImage(string imageUrl, string fileName, string directoryName = "");
        string[] GetMarsRoverPhotosByDate(string directoryName);
    }
}
