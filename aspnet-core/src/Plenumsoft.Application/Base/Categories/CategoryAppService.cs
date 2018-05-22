using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Plenumsoft.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace Plenumsoft.Base.Categories
{
    public class CategoryAppService : CrudAppService<Domain.Category, Dto.CategoryDto, int, Dto.CategoryInputDto>, ICategoryAppService
    {

        public void CustomCreate() {
        }

        public CategoryAppService(IRepository<Domain.Category> repository) : base(repository)
        {
        }

        public override PagedResultDto<CategoryDto> GetAll(CategoryInputDto input)
        {
            var query = Repository.GetAll();

            query = query.Where(x => x.Name == input.Name);

            return base.GetAll(input);
        }

    }
}
