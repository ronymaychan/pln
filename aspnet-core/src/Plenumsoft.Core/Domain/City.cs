using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Plenumsoft.Domain
{
    public class City  : Abp.Domain.Entities.Entity<string>, Abp.Domain.Entities.IPassivable
    {
        public string Name { get; set; }
        public string Abreviation { get; set; }
        public bool IsActive { get; set; }
        public string EstateId { get; set; }
        public virtual Estate Estate { get; set; }
    }
}
