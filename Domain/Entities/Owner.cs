namespace VoteMaster.Domain
{
    public class Owner : User
    {
        private readonly IReferendumOwnerService _referendumOwnerService;

        public HashSet<Guid> ReferendumIds { get; private set; }

        public Owner(Guid id, string name, IEligibilityService eligibilityService, IVoteService voteService, IReferendumOwnerService referendumOwnerService)
            : base(id, name, eligibilityService, voteService)
        {
            ReferendumIds = new HashSet<Guid>();
            _referendumOwnerService = referendumOwnerService;
        }

        public void AddReferendum(Guid referendumId)
        {
            if (referendumId == null)
                throw new ArgumentNullException(nameof(Guid));

            ReferendumIds.Add(referendumId);
            _referendumOwnerService.AddReferendumToOwner(Id, referendumId);
        }

        public void RemoveReferendum(Guid referendumId)
        {
            if (referendumId == null)
                throw new ArgumentNullException(nameof(Guid));

            ReferendumIds.Remove(referendumId);
            _referendumOwnerService.RemoveReferendumFromOwner(Id, referendumId);
        }

        public bool OwnsReferendum(Guid referendumId)
        {
            if (referendumId == null)
                throw new ArgumentNullException(nameof(Guid));

            return _referendumOwnerService.GetReferendumsOwnedByUser(Id).Any(r => r == referendumId);
        }

        public IEnumerable<Guid> GetOwnedReferendums()
        {
            return _referendumOwnerService.GetReferendumsOwnedByUser(Id);
        }
    }
}