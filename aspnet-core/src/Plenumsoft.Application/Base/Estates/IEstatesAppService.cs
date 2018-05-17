﻿using Abp.Application.Services;
using Plenumsoft.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Plenumsoft.Base.Estates
{
    public interface IEstatesAppService : ICrudAppService<EstateDto, string, EstateInputDto, EstateCreateDto>, IApplicationService
    {
    }
}
