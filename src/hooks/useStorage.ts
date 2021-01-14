import { useState, useEffect } from 'react';
import { projectStorage } from '../firebase/config';

const useStorage = (file: File | null) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<Error | null>(null);
    const [url, setUrl] = useState<string | null>(null);

    useEffect(() => {
        //references
        if (file) {
            const storageRef = projectStorage.ref(file!.name);

            storageRef.put(file!).on(
                'state_change',
                (snap) => {
                    let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
                    setProgress(percentage);
                },
                (err) => {
                    setError(err);
                },
                async () => {
                    const url = await storageRef.getDownloadURL();
                    setUrl(url);
                }
            );
        }
    }, [file]);

    return { progress, url, error };
};

export default useStorage;
