// models/reviewProposal.js

const mockReviewProposal = [
    { id: 1, reviewer_id: 1, proposal_id: 101, status: 'reviewed' },
    { id: 2, reviewer_id: 1, proposal_id: 102, status: 'assigned' },
    { id: 3, reviewer_id: 1, proposal_id: 103, status: 'reviewed' },

    { id: 4, reviewer_id: 2, proposal_id: 104, status: 'reviewed' },
    { id: 5, reviewer_id: 2, proposal_id: 105, status: 'assigned' },

    { id: 6, reviewer_id: 3, proposal_id: 106, status: 'assigned' },
];

exports.getByReviewerId = (reviewerId) => {
    return mockReviewProposal.filter(item => item.reviewer_id === reviewerId);
};
