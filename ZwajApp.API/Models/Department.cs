using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ZwajApp.API.Models
{
    public class Department
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Department> Menus { get; set; }

    }
}