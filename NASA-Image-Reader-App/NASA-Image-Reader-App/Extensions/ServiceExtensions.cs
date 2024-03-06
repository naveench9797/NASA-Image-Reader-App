
using NASA_Image_Reader_App.Helper;

namespace NASA_Image_Reader_App.Extensions
{
    public static class ServiceExtensions
    {
        public static IServiceCollection RegisterServices(this IServiceCollection services)
        {
            services.AddScoped<IImageHelper, ImageHelper>();
            return services;
        }
    }
}
