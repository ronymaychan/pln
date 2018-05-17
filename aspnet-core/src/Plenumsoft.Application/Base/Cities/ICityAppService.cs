using Abp.Application.Services;
using Plenumsoft.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace Plenumsoft.Base.Cities
{
    public interface ICityAppService : ICrudAppService<CityDto, string, CityInputDto, CityCreateDto>, IApplicationService
    {
    }
}
