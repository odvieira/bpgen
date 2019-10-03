using Microsoft.AspNetCore.Builder;using Microsoft.AspNetCore.Hosting;using Microsoft.AspNetCore.Mvc;using Microsoft.EntityFrameworkCore;using Microsoft.Extensions.Configuration;using Microsoft.Extensions.DependencyInjection;
using Sita.APC.Toolset.Core.Middleware;using Sita.APC.Toolset.Repository.Database;using Sita.APC.Toolset.Repository.Middleware;using Sita.APC.Toolset.Services.Middleware;using Swashbuckle.AspNetCore.Swagger;

namespace Sita.APC.Toolset.API{    public class Startup    {        public Startup(IConfiguration configuration)        {            Configuration = configuration;        }        public IConfiguration Configuration { get; }        // This method gets called by the runtime. Use this method to add services to the container.        public void ConfigureServices(IServiceCollection services)        {            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                    builder =>
                    {
                        builder
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials();
                    });
            });

            // Core
            services.AddCoreDependency();            // ConnectionString            services.AddDbContext<BoardingPassContext>(                options => options.UseInMemoryDatabase(databaseName: "db")                //options.UseSqlServer(                //    Configuration.GetConnectionString("BoardingPassToolsetConnection"),                //    b => b.MigrationsAssembly("Sita.APC.Toolset.API")                //)            );            // Repository            services.AddRepositoryDependency();            // Services            services.AddServicesDependency();

            // Any other
            services.AddSwaggerGen(x => x.SwaggerDoc("bpgen", new Info { Title = "Boarding Pass Generator", Version = "v1" }));        }        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.        public void Configure(IApplicationBuilder app, IHostingEnvironment env)        {            if (env.IsDevelopment())            {                app.UseDeveloperExceptionPage();            }            else            {                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.                app.UseHsts();            }            app.UseCors("AllowAll");            // app.UseHttpsRedirection();

            app.UseMvc();            var swaggerOptions = new Options.SwaggerOptions();
            Configuration.GetSection(nameof(Options.SwaggerOptions)).Bind(swaggerOptions);

            app.UseSwagger(option => option.RouteTemplate = swaggerOptions.JsonRoute);

            app.UseSwaggerUI(option => option.SwaggerEndpoint(swaggerOptions.UiEndpoint, swaggerOptions.Description));        }    }}
