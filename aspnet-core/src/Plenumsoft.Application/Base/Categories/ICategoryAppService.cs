using System;
using System.Collections.Generic;
using System.Text;
using Abp.Application.Services;

namespace Plenumsoft.Base.Categories
{
    public interface ICategoryAppService: ICrudAppService<Dto.CategoryDto, int, Dto.CategoryInputDto>, IApplicationService
    {
        void CustomCreate();
    }
}
