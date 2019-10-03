using Microsoft.AspNetCore.Mvc;
using Sita.APC.Toolset.Core.Exceptions;
using Sita.APC.Toolset.Domain.DataTransfer;
using Sita.APC.Toolset.Domain.Interfaces;
using Sita.APC.Toolset.Domain.Models;
using Sita.APC.Toolset.Services.Interfaces;
using System.Threading.Tasks;
using System.Net;
using System.Collections.Generic;

namespace Sita.APC.Toolset.Controllers
{
    [Route("bpgen")]
    [ApiController]
    public class BoardingPassGeneratorController : ControllerBase
    {
        private readonly IApplicationProgrammingInterface<BoardingPass> _boardingPassAPI;

        public BoardingPassGeneratorController(IApplicationProgrammingInterface<BoardingPass> bpAPI)
        {
            _boardingPassAPI = bpAPI;
        }

        // GET: api/BoardingPass
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var boardingPassList = await _boardingPassAPI.FindAll();
             
            try
            {
                return Ok(
                    new RequestResult(
                        ResultType.Success,
                        ResultType.Success.ToString(),
                        boardingPassList
                    )
                );                
            }
            catch (KeyNotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch (System.Exception e)
            {
                return new ContentResult
                {
                    StatusCode = (int)HttpStatusCode.InternalServerError,
                    ContentType = "text/html",
                    Content = e.Message
                };
            }
        }

        // GET: api/BoardingPass/id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBoardingPass(string id)
        {
            IBoardingPass boardingPass;

            try
            {
                boardingPass = await _boardingPassAPI.Find(id);

                if (boardingPass == null)
                    return NotFound();

                return Ok(boardingPass);
            }
            catch (KeyNotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch (System.Exception e)
            {
                return new ContentResult
                {
                    StatusCode = (int)HttpStatusCode.InternalServerError,
                    ContentType = "text/html",
                    Content = e.Message
                };
            }
        }

        // POST: api/BoardingPass
        [HttpPost]
        public async Task<IActionResult> PostBoardingPass(BoardingPass boardingPass)
        {
            try
            {
                await _boardingPassAPI.Create(boardingPass);

                return CreatedAtAction(
                    nameof(PostBoardingPass),
                    new { id = boardingPass.BoardingPassId },
                    new {
                        result = new RequestResult(
                            ResultType.Success,
                            ResultType.Success.ToString(),
                            new { id = boardingPass.BoardingPassId }
                        )
                    }
                );
            }
            catch (InvalidFieldException e)
            {
                return BadRequest(
                    new RequestResult(
                        ResultType.InvalidField,
                        e.Message,
                        null
                    )
                );
            }
            catch (System.Exception e)
            {
                return new ContentResult
                {
                    StatusCode = (int)HttpStatusCode.InternalServerError,
                    ContentType = "text/html",
                    Content = e.Message
                };
            }
        }

        // PUT: api/BoardingPass/id
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBoardingPass(string id, BoardingPass updatedBoardingPass)
        {
            try
            {
                updatedBoardingPass.BoardingPassId = id;

                var boardingPass = await _boardingPassAPI.Update(updatedBoardingPass);

                return CreatedAtAction(
                    nameof(PutBoardingPass),
                    new { id = boardingPass.BoardingPassId },
                    new
                    {
                        result = new RequestResult(
                            ResultType.Success,
                            ResultType.Success.ToString(),
                            new { id = boardingPass.BoardingPassId }
                        )
                    }
                );
            }
            catch (KeyNotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch (InvalidFieldException e)
            {
                return BadRequest(
                    new RequestResult(
                        ResultType.InvalidField,
                        e.Message,
                        null
                    )
                );
            }
            catch (System.Exception e)
            {
                return new ContentResult
                {
                    StatusCode = (int)HttpStatusCode.InternalServerError,
                    ContentType = "text/html",
                    Content = e.Message
                };
            }
        }

        // DELETE: api/BoardingPass/id        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBoardingPass(string id)
        {
            try
            {
                await _boardingPassAPI.Delete(id);

                return Ok(
                    new RequestResult(
                        ResultType.Success,
                        ResultType.Success.ToString(),
                        null
                    )
                );
                
            }
            catch (KeyNotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch (System.Exception e)
            {
                return new ContentResult
                {
                    StatusCode = (int)HttpStatusCode.InternalServerError,
                    ContentType = "text/html",
                    Content = e.Message
                };
            }
        }
    }
}