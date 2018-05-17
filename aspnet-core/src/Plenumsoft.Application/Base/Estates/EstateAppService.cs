using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Plenumsoft.Authorization;
using Plenumsoft.Dto;
using Plenumsoft.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Plenumsoft.Base.Estates
{
    [AbpAuthorize(PermissionNames.Pages_Countries)]
    public class EstateAppService : CrudAppService<Estate, EstateDto, string, EstateInputDto, EstateCreateDto>, IEstatesAppService
    {
        public EstateAppService(IRepository<Estate, string> repository) : base(repository)
        {
        }

        protected override IQueryable<Estate> ApplySorting(IQueryable<Estate> query, EstateInputDto input)
        {
            return query.OrderBy(x => x.Country.Name).OrderBy(x => x.Name);
        }

        protected override IQueryable<Estate> CreateFilteredQuery(EstateInputDto input)
        {
            var query = Repository.GetAllIncluding(e => e.Country);

            if (!string.IsNullOrEmpty(input.Name))
                query = query.Where(c => c.Name.ToLower().Contains(input.Name.ToLower()));

            if (input.IsActive != null)
                query = query.Where(c => c.IsActive == input.IsActive);

            if (!string.IsNullOrEmpty(input.CountryId))
                query = query.Where(c => c.CountryId == input.CountryId);

            return query;
        }
    }
}
