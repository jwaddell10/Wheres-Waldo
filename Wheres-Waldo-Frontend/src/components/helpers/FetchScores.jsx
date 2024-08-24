import { useState } from "react";

export default function useFetchScores() {
    const [scores, setScores] = useState([]);

    const fetchScores = async () => {

        const response = await fetch(import.meta.env.API_URL`leaderboard`)
        const data = await response.json();
        setScores(data)
        return data;
    }

    return { scores, setScores, fetchScores }
}
