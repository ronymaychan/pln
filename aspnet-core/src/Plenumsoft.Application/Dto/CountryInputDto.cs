using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Plenumsoft.Dto
{
    public class CountryInputDto : PagedResultRequestDto
    {
        public string Name { get; set; }
        public bool? IsActive { get; set; }
    }
}
