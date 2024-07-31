import { useState } from "react";

export default function useFetchScores() {
    const [scores, setScores] = useState([]);

    const fetchScores = async () => {

        const response = await fetch(`http://localhost:3000/leaderboard`)
        const data = await response.json();
        setScores(data)
        return data;
    }

    return { scores, setScores, fetchScores }
}
