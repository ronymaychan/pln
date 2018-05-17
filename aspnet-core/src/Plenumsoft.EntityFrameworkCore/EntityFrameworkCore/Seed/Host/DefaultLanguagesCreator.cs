using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Abp.Localization;

namespace Plenumsoft.EntityFrameworkCore.Seed.Host
{
    public class DefaultLanguagesCreator
    {
        public static List<ApplicationLanguage> InitialLanguages => GetInitialLanguages();

        private readonly PlenumsoftDbContext _context;

        private static List<ApplicationLanguage> GetInitialLanguages()
        {
            return new List<ApplicationLanguage>
            {
                new ApplicationLanguage(null, "en", "English", "famfamfam-flags gb"),
                new ApplicationLanguage(null, "es", "Español México", "famfamfam-flags mx"),
            };
        }

        public DefaultLanguagesCreator(PlenumsoftDbContext context)
        {
            _context = context;
        }

        public void Create()
        {
            CreateLanguages();
        }

        private void CreateLanguages()
        {
            foreach (var language in InitialLanguages)
            {
                AddLanguageIfNotExists(language);
            }
        }

        private void AddLanguageIfNotExists(ApplicationLanguage language)
        {
            if (_context.Languages.IgnoreQueryFilters().Any(l => l.TenantId == language.TenantId && l.Name == language.Name))
            {
                return;
            }

            _context.Languages.Add(language);
            _context.SaveChanges();
        }
    }
}
