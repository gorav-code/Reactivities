using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            _next = next;
            _logger = logger;
            _env = env;
        }

        //'InvokeAsync' is predefined name for Middleware and it should be used as it is.
        public async Task InvokeAsync(HttpContext context)
        {
            try
            {

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                var resposne = _env.IsDevelopment()
                ? new AppException(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString())
                : new AppException(context.Response.StatusCode, "Internal Server Error", ex.StackTrace?.ToString());

                var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
                var json = JsonSerializer.Serialize(resposne, options);
                await context.Response.WriteAsync(json);
            }
        }
    }
}