using System;
using System.ComponentModel.DataAnnotations;
using Sita.APC.Toolset.Core.Database;
using Sita.APC.Toolset.Domain.Interfaces;

namespace Sita.APC.Toolset.Domain.Models
{
    public class Airport : ModelBase, IAirport
    {
        [Display(Name = "ident", Order = 1 )]
        public string Ident { get; set; }

        [Display(Name = "type", Order = 2 )]
        public string Type { get; set; }

        [Display(Name = "name", Order = 3 )]
        public string Name { get; set; }

        [Display(Name = "elevation_ft", Order = 4 )]
        public string ElevationFt { get; set; }

        [Display(Name = "continent", Order = 5 )]
        public string Continent { get; set; }

        [Display(Name = "iso_country", Order = 6 )]
        public string IsoCountry { get; set; }

        [Display(Name = "iso_region", Order = 7 )]
        public string Iso_region { get; set; }

        [Display(Name = "municipality", Order = 8 )]
        public string Municipality { get; set; }

        [Display(Name = "gps_code", Order = 9 )]
        public string GpsCode { get; set; }

        [Display(Name = "iata_code", Order = 10 )]
        public string IataCode { get; set; }

        [Display(Name = "local_code", Order = 11 )]
        public string LocalCode { get; set; }

        [Display(Name = "coordinates", Order = 12 )]
        public string Coordinates { get; set; }
    }
}