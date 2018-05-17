using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace Plenumsoft.Dto
{
    public class EstateCreateDto : EntityDto<string>
    {
        public string Name { get; set; }
        public string Abreviation { get; set; }
        public bool IsActive { get; set; }
        public string CountryId { get; set; }
    }
}
