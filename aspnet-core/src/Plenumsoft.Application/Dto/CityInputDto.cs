using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace Plenumsoft.Dto
{
    public class CityInputDto : PagedResultRequestDto
    {
        public string Name { get; set; }
        public bool? IsActive { get; set; }
        public string EstateId { get; set; }
        public string CountryId { get; set; }

    }
}
