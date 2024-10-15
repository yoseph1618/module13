import { useState, useEffect } from 'react';

// Define the same type as in CandidateSearch.tsx
interface Candidate {
  avatar: string;
  name: string;
  username: string;
  location: string;
  email: string;
  company: string;
  html_url: string;
}

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>(() => {
    const candidates = localStorage.getItem('savedCandidates');
    return candidates ? JSON.parse(candidates) : [];
  });

  useEffect(() => {
    localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
  }, [savedCandidates]);

  // Example function to remove a candidate (if you want this functionality)
  const handleRemoveCandidate = (index: number) => {
    const updatedCandidates = savedCandidates.filter((_, i) => i !== index);
    setSavedCandidates(updatedCandidates);
  };

  if (savedCandidates.length === 0) {
    return <p>No candidates have been accepted.</p>;
  }

  return (
    <div>
      <h1>Potential Candidates</h1>
      <ul>
        {savedCandidates.map((candidate: Candidate, index: number) => (
          <li key={index}>
            <img src={candidate.avatar} alt={`${candidate.name}'s avatar`} />
            <p>Name: {candidate.name}</p>
            <p>Username: {candidate.username}</p>
            <p>Location: {candidate.location}</p>
            <p>Email: {candidate.email}</p>
            <p>Company: {candidate.company}</p>
            <a href={candidate.html_url} target="_blank" rel="noreferrer">
              Profile
            </a>
            <button onClick={() => handleRemoveCandidate(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedCandidates;
