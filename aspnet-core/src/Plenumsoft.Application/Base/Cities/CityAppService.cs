using Abp.Application.Services;
using Abp.Domain.Repositories;
using Plenumsoft.Dto;
using Plenumsoft.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Plenumsoft.Base.Cities
{
    public class CityAppService : CrudAppService<City, CityDto, string, CityInputDto, CityCreateDto>, ICityAppService
    {
        public CityAppService(IRepository<City, string> repository) : base(repository)
        {
        }

        public override CityDto Create(CityCreateDto input)
        {
            return base.Create(input);
        }

        protected override IQueryable<City> ApplySorting(IQueryable<City> query, CityInputDto input)
        {
            return query.OrderBy(x => x.Estate.Country.Name).ThenBy(x => x.Estate.Name).ThenBy(x => x.Name);
        }

        protected override IQueryable<City> CreateFilteredQuery(CityInputDto input)
        {
            var query = Repository.GetAllIncluding(e => e.Estate, e => e.Estate.Country);

            if (!string.IsNullOrEmpty(input.Name))
                query = query.Where(c => c.Name.ToLower().Contains(input.Name.ToLower()));

            if (input.IsActive != null)
                query = query.Where(c => c.IsActive == input.IsActive);

            if (!string.IsNullOrEmpty(input.EstateId))
                query = query.Where(c => c.EstateId == input.EstateId);

            if (!string.IsNullOrEmpty(input.CountryId))
                query = query.Where(c => c.Estate.CountryId == input.CountryId);

                return query;
        }
    }
}
