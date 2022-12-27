using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities;
using Application.Core;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Persistence;
using FluentValidation;
using FluentValidation.AspNetCore;

namespace API.Extensions
{
    //we are creating this class to add all services here and use it 
    public static class ApplicationServiceExtensions
    {

        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
            });

            services.AddCors(opt =>
            {   
                opt.AddPolicy("CorsPolicy", policy =>
                {  
                    policy.WithOrigins("http://localhost:3000")
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowCredentials();
                });
            });
 
            //registering MediatR
            services.AddMediatR(typeof(List.Handler).Assembly);

            services.AddDbContext<DataContext>(opt => 
            {
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });

            //register Auto Mapper
            services.AddAutoMapper(typeof(MappingProfiles));
            
            //register Add Fluent Validator 
            services.AddFluentValidationAutoValidation();
            services.AddValidatorsFromAssemblyContaining<Create>();

            return services;
        }
    }
}