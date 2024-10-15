import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';

// Define a type for candidate data
interface Candidate {
  avatar: string;
  name: string;
  username: string;
  location: string;
  email: string;
  company: string;
  html_url: string;
}

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]); // List of candidates with a proper type
  const [currentIndex, setCurrentIndex] = useState<number>(0); // Current candidate index
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]); // List of saved candidates
  const [noCandidates, setNoCandidates] = useState(false); // Check if there are no more candidates

  useEffect(() => {
    const fetchCandidates = async () => {
      const result: Candidate[] = await searchGithub(); // Replace with actual API function
      if (result.length === 0) {
        setNoCandidates(true);
      } else {
        setCandidates(result);
      }
    };

    fetchCandidates();
  }, []);

  const handleSaveCandidate = () => {
    setSavedCandidates([...savedCandidates, candidates[currentIndex]]);
    handleNextCandidate();
  };

  const handleNextCandidate = () => {
    if (currentIndex < candidates.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setNoCandidates(true);
    }
  };

  if (noCandidates) {
    return <p>No more candidates available for review.</p>;
  }

  const candidate = candidates[currentIndex];

  return (
    <div>
      <h1>Candidate Search</h1>
      {candidate && (
        <div>
          <img src={candidate.avatar} alt={`${candidate.name}'s avatar`} />
          <p>Name: {candidate.name}</p>
          <p>Username: {candidate.username}</p>
          <p>Location: {candidate.location}</p>
          <p>Email: {candidate.email}</p>
          <p>Company: {candidate.company}</p>
          <a href={candidate.html_url} target="_blank" rel="noreferrer">
            Profile
          </a>
          <div>
            <button onClick={handleSaveCandidate}>+</button>
            <button onClick={handleNextCandidate}>-</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateSearch;
