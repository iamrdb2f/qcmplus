import {useEffect, useState} from 'react';

// Custom hook to handle the exam timer
const useExamTimer = (initialTime, onTimeUp) => {
    const [timer, setTimer] = useState(initialTime);

    useEffect(() => {
        if (timer > 0) {
            const timerId = setTimeout(() => setTimer(timer - 1), 1000);
            return () => clearTimeout(timerId);
        } else {
            onTimeUp();
        }
    }, [timer, onTimeUp]);

    return [timer, setTimer];
};

export default useExamTimer;