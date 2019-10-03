﻿using Microsoft.AspNetCore.Builder;
using Sita.APC.Toolset.Core.Middleware;

namespace Sita.APC.Toolset.API
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
            services.AddCoreDependency();

            // Any other
            services.AddSwaggerGen(x => x.SwaggerDoc("bpgen", new Info { Title = "Boarding Pass Generator", Version = "v1" }));

            app.UseMvc();
            Configuration.GetSection(nameof(Options.SwaggerOptions)).Bind(swaggerOptions);

            app.UseSwagger(option => option.RouteTemplate = swaggerOptions.JsonRoute);

            app.UseSwaggerUI(option => option.SwaggerEndpoint(swaggerOptions.UiEndpoint, swaggerOptions.Description));