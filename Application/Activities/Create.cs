using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command: IRequest<Result<Unit>>
        {
            public Activity Activity {get; set;}
            
        }


        //we are creating this class to validate our api calls
        //this make use of 'FluentValidator' package
        //we also register 'FluentValidator' as server in 'ApplicationServiceExtensions'
        public class CommandValidator: AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x=> x.Activity).SetValidator(new ActivityValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            public DataContext _context { get; }
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity);
                var result = await _context.SaveChangesAsync() > 0;
                if(!result) return Result<Unit>.Failure("Failed to create activity");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}