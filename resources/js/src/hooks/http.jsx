import {useState, useCallback} from 'react';
import {useSelector} from "react-redux";

const useHttp = () => {

    const accessToken = useSelector(state => state.main.accessToken);

    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const sendHttpRequest = useCallback(async (url, setup = {}, manageData = null) => {
        setIsLoading(true);

        let headers = setup.headers ? setup.headers : {};

        headers['Accept'] = 'application/json';

        if (accessToken) {
            headers['Authorization'] = 'Bearer ' + accessToken;
        }

        try {
            const response = await fetch(url,
                {
                    method: setup.method ? setup.method : 'GET',
                    headers: headers,
                    body: setup.data ? JSON.stringify(setup.data) : null
                });

            setIsLoading(false);

            if (!response.ok) {
                throw new Error('Request error');
            }

            const data = await response.json();
            if (manageData) {
                manageData(data);
            }

        }catch (e) {
            setError(e.message || 'Something went wrong');
        }
    }, [accessToken]);

    return {
        isLoading,
        error,
        sendHttpRequest
    }
}

export default useHttp;
