import {useEffect, useState} from 'react';

const useExamTimer = (initialTime, onTimeExpire) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        if (timeLeft <= 0) {
            onTimeExpire();
            return;
        }

        const intervalId = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft, onTimeExpire]);

    return [timeLeft, setTimeLeft];
};

export default useExamTimer;