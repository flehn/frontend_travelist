// components/ListDetailsComponent.js
import React, { useEffect, useState } from 'react';
import { API_ENDPOINTS } from '../../../../../../../Alt_NextJS/nextjs_travelist/apiConfig';  
import styles from './DisplayList.module.css';
import Cookies from "js-cookie";

interface Element {
    id: number;
    name: string;
}

interface ListDetails {
    id: number;
    name: string;
    author: number;
    is_public: boolean;
    elements: Element[];
    likes_count: number;
}

interface ListDetailsComponentProps {
    listId: number;
}


const isError = (value: any): value is Error => value instanceof Error;

const ListDetailsComponent: React.FC<ListDetailsComponentProps> = ({ listId }) => {
    const [listDetails, setListDetails] = useState<ListDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_ENDPOINTS.get_list_with_elements(listId), {
                    method: 'GET',
                    headers: { 'Accept': 'application/json' }
                });
                if (!response.ok) throw new Error('Failed to fetch list details');
                const data: ListDetails = await response.json();
                setListDetails(data);
            } catch (err: unknown) {
                if (isError(err)) {
                    setError(err.message);
                } else {
                    setError('An unexpected error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [listId]);

    

    const handleLike = async () => {

        try {
            const token = Cookies.get('accessToken');
            const response = await fetch(API_ENDPOINTS.like_list, {
                method: 'POST',
                mode: 'cors',
                headers: { 
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ list_id: listId })
            });
    
            const data = await response.json();
            if (response.ok) {
                setListDetails(prevDetails => {
                    if (prevDetails !== null) {  // Ensure prevDetails is not null
                        return {
                            ...prevDetails,
                            likes_count: data.likes_count  // Use likes_count from the server's response
                        };
                    }
                    return null;  // Return null if prevDetails was null
                });
            } else {
                console.error('Failed to update like:', data.error);
            }
        } catch (error) {
            console.error('Error liking the list:', error);
        }
    };
    


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <h2 className={styles.title}>{listDetails?.name}</h2>
                <p className={styles.visibilityStatus}>
                    {listDetails?.is_public ? 'Public' : 'Private'} List
                </p>
                <div>
                    {listDetails?.elements.map(element => (
                        <div className={styles.element} key={element.id}>
                            {element.name}
                        </div>
                    ))}
                </div>
                <div className={styles.flex}>
                <button className={styles.likeButton} onClick={handleLike}>Like</button>
                <p>Likes: {listDetails?.likes_count}</p>
                </div>
            </div>
            <div className={styles.shareLinkWrapper}>
                <p className={styles.linkText}>Share this List:</p>
                <p className={styles.shareLink}>http://localhost:3000/r/{listDetails?.id}</p>
            </div>
        </div>
    );
};

export default ListDetailsComponent;
