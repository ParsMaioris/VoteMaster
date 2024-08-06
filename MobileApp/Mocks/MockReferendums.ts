import {Referendum} from "../DTOs/Referendums"
import infrastructureImage from '../assets/infrastructureimage.png'
import educationImage from '../assets/educationimage.png'
import healthcareImage from '../assets/healthcareimage.png'

export const referendums: Referendum[] = [
    {
        id: '7d918783-073f-4b99-bc38-0ee9a7762943',
        title: 'Infrastructure Referendum',
        description: 'Vote on a proposed tax reform that aims to fund public infrastructure improvements and social welfare programs.',
        image: infrastructureImage,
        key: 'infrastructure',
        publicationDate: '2024-07-23',
        endTime: '2024-10-17',
    },
    {
        id: 'a68d20bb-483b-4f34-889e-94e9054007f7',
        title: 'Education Referendum',
        description: 'Support or reject a proposal to increase funding for public education, including enhancing educational resources and teacher salaries.',
        image: educationImage,
        key: 'education',
        publicationDate: '2024-07-23',
        endTime: '2024-07-24',
    },
    {
        id: '7d918783-073f-4b99-bc38-0ee9a7762940',
        title: 'Healthcare Referendum',
        description: 'Cast your vote on a proposal designed to overhaul prescription drug policy, addressing price negotiations, drug importation, cost caps, pricing transparency, and annual price increase control.',
        image: healthcareImage,
        key: 'healthcare',
        publicationDate: '2024-07-23',
        endTime: '2024-10-01',
    },
]