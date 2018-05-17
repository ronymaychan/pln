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

                //Contry Mapping 
                config.CreateMap<Domain.Country, Dto.CountryDto>().ReverseMap();

                //Estate Mapping
                config.CreateMap<Domain.Estate, Dto.EstateDto>()
                    .ForMember(x => x.CountryName, opt => opt.MapFrom(x => x.Country.Abreviation));
                config.CreateMap<Dto.EstateDto, Domain.Estate>();
                config.CreateMap<Dto.EstateCreateDto, Domain.Estate>().ReverseMap();

                //City Mapping
                config.CreateMap<Domain.City, Dto.CityDto>()
                    .ForMember(x => x.EstateName, opt => opt.MapFrom(x => x.Estate.Abreviation))
                    .ForMember(x => x.CountryName, opt => opt.MapFrom(x => x.Estate.Country.Abreviation));
                config.CreateMap<Dto.CityDto, Domain.City>();
                config.CreateMap<Dto.CityCreateDto, Domain.City>().ReverseMap();

            });
        }
    }
}
