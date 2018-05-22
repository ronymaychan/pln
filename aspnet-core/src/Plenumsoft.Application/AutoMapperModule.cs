using Abp.AutoMapper;
using Abp.Modules;
using System;
using System.Collections.Generic;
using System.Text;

namespace Plenumsoft
{
    [DependsOn(typeof(AbpAutoMapperModule))]
    public class AutoMapperModule : Abp.Modules.AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Modules.AbpAutoMapper().Configurators.Add(config => {

                //Country Mapping 
                config.CreateMap<Domain.Country, Dto.CountryDto>().ReverseMap();

                //State Mapping
                config.CreateMap<Domain.State, Dto.StateDto>()
                    .ForMember(x => x.CountryName, opt => opt.MapFrom(x => x.Country.Abreviation));
                config.CreateMap<Dto.StateDto, Domain.State>();
                config.CreateMap<Dto.StateCreateDto, Domain.State>().ReverseMap();

                //City Mapping
                config.CreateMap<Domain.City, Dto.CityDto>()
                    .ForMember(x => x.StateName, opt => opt.MapFrom(x => x.State.Abreviation))
                    .ForMember(x => x.CountryName, opt => opt.MapFrom(x => x.State.Country.Abreviation));
                config.CreateMap<Dto.CityDto, Domain.City>();
                config.CreateMap<Dto.CityCreateDto, Domain.City>().ReverseMap();


                config.CreateMap<Domain.Category, Dto.CategoryDto>().ReverseMap();

            });
        }
    }
}
