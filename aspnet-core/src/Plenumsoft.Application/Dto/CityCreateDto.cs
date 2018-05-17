using System;
using System.Collections.Generic;
using System.Text;

namespace Plenumsoft.Dto
{
    public class CityCreateDto : Abp.Application.Services.Dto.EntityDto<string>
    {
        public string Name { get; set; }
        public string Abreviation { get; set; }
        public bool? IsActive { get; set; }
        public string EstateId { get; set; }
    }
}
