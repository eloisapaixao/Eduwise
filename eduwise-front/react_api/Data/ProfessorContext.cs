using Microsoft.EntityFrameworkCore;
using react_api.Models;
using System.Diagnostics.CodeAnalysis;


namespace react_api.Data
{
    public class ProfessorContext : DbContext
    {
        protected readonly IConfiguration Configuration;
        public ProfessorContext(IConfiguration configuration)
        {   
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // connect to sql server with connection string from app settings
            options.UseSqlServer(Configuration.GetConnectionString("StringConexaoSQLServer"));
        }

        public DbSet<Professor>? Professor {get;set;}
    }
}