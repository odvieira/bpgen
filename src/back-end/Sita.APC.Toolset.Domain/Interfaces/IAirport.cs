using System.ComponentModel.DataAnnotations;
using Sita.APC.Toolset.Core.Database;

namespace Sita.APC.Toolset.Domain.Interfaces
{
    public interface IAirport : IModelBase
    {
        [Display(Name = "ident", Order = 1 )]
        string Ident { get; set; }

        [Display(Name = "type", Order = 2 )]
        string Type { get; set; }

        [Display(Name = "name", Order = 3 )]
        string Name { get; set; }

        [Display(Name = "elevation_ft", Order = 4 )]
        string ElevationFt { get; set; }

        [Display(Name = "continent", Order = 5 )]
        string Continent { get; set; }

        [Display(Name = "iso_country", Order = 6 )]
        string IsoCountry { get; set; }

        [Display(Name = "iso_region", Order = 7 )]
        string Iso_region { get; set; }

        [Display(Name = "municipality", Order = 8 )]
        string Municipality { get; set; }

        [Display(Name = "gps_code", Order = 9 )]
        string GpsCode { get; set; }

        [Display(Name = "iata_code", Order = 10 )]
        string IataCode { get; set; }

        [Display(Name = "local_code", Order = 11 )]
        string LocalCode { get; set; }

        [Display(Name = "coordinates", Order = 12 )]
        string Coordinates { get; set; }

    }
}