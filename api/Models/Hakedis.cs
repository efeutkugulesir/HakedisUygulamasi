using System;

namespace HakedisAPI.Models
{
    public class Hakedis
    {
        public int Id { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public int? EstimatedTime { get; set; }
        public decimal? GrossWage { get; set; }
        public decimal? NetWage { get; set; }
        public required string Creater { get; set; }
        public DateTimeOffset? CreateDate { get; set; }
        public required string Updater { get; set; }
        public DateTimeOffset? UpdateDate { get; set; }
        public int? CId { get; set; }
    }
}
