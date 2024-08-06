using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using VoteMaster.Api;
using VoteMaster.Domain;

namespace VoteMaster.Application
{
    public class ReferendumQueryService
    {
        private readonly IReferendumService _referendumService;
        private readonly IReferendumRepository _referendumRepository;

        public ReferendumQueryService(IReferendumService referendumService, IReferendumRepository referendumRepository)
        {
            _referendumService = referendumService;
            _referendumRepository = referendumRepository;
        }

        public Task<Referendum> GetReferendumById(Guid referendumId)
        {
            return Task.Run(() =>
            {
                return _referendumService.GetReferendumById(referendumId);
            });
        }

        public Task<IEnumerable<ReferendumDetailsDTO>> GetAllReferendumDetails()
        {
            return Task.Run(() =>
            {
                return _referendumRepository.GetAllReferendumDetails();
            });
        }
    }
}