import { useState, useEffect } from 'react';


export const useNotifications = () => {
    const [notifications, setNotifications] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadNotifications = async () => {
        try {
            // const data = await apiService.getNotifications();
            setNotifications([]);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadNotifications();
    }, []);

    return { notifications, isLoading, refetch: loadNotifications };
};
