using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
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
        
         protected ActionResult HandleResult<T>(Result<T> result)
         {
            if(result == null)
                return NotFound();

            if(result.IsSuccess && result.Value!= null)
            {
                return Ok(result.Value);
            }

            if(result.IsSuccess && result.Value == null)
            {
                return NotFound();
            }

            return BadRequest(result.Error); 
         }
    }
}