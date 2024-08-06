using VoteMaster.Api;
using VoteMaster.Domain;

namespace VoteMaster.Infrastructure;

public class InMemoryReferendumRepository : IReferendumRepository
{
    private readonly List<Referendum> _referendums = new List<Referendum>();

    public void AddReferendum(Referendum referendum)
    {
        _referendums.Add(referendum);
    }

    public IEnumerable<ReferendumDetailsDTO> GetAllReferendumDetails()
    {
        throw new NotImplementedException();
    }

    public Referendum GetReferendumById(Guid referendumId)
    {
        return _referendums.SingleOrDefault(r => r.Id == referendumId);
    }
}