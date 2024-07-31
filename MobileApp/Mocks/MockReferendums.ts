import {Referendum} from "../DTOs/Referendums"

export const referendums: Referendum[] = [
    {
        id: '7d918783-073f-4b99-bc38-0ee9a7762943',
        title: 'Infrastructure Referendum',
        description: 'Vote on a proposed tax reform that aims to fund public infrastructure improvements and social welfare programs.',
        image: 'https://images.pexels.com/photos/6931306/pexels-photo-6931306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        key: 'infrastructure',
    },
    {
        id: 'a68d20bb-483b-4f34-889e-94e9054007f7',
        title: 'Education Referendum',
        description: 'Support or reject a proposal to increase funding for public education, including enhancing educational resources and teacher salaries.',
        image: 'https://images.pexels.com/photos/3646172/pexels-photo-3646172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        key: 'education',
    },
    {
        id: '7d918783-073f-4b99-bc38-0ee9a7762940',
        title: 'Healthcare Referendum',
        description: 'Cast your vote on a proposal designed to overhaul prescription drug policy, addressing price negotiations, drug importation, cost caps, pricing transparency, and annual price increase control.',
        image: 'https://images.pexels.com/photos/139398/thermometer-headache-pain-pills-139398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        key: 'healthcare',
    },
]