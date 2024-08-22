import {useEffect, useState} from 'react';

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

    const resetTimer = () => {
        setTimer(initialTime);
    };

    return [timer, resetTimer];
};

export default useExamTimer;
