using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // api/<nameofController>
    [EnableCors("CorsPolicy")]
    public class BaseApiController : ControllerBase
    {
         private IMediator _mediator;

         //here we are creating a property availablefor only derived classes and if _mediator is null then assign 
         protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();
        
    }
}