import { useState, useCallback } from 'react';

function useReceiveMessages() {
    const [receivedMessages, setReceivedMessages] = useState([]);

    const addReceivedMessage = useCallback((message) => {
        setReceivedMessages(prevMessages => [...prevMessages, message]);
    }, []);

    return { receivedMessages, addReceivedMessage };
}

export default useReceiveMessages;
