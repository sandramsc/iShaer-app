import React,  { useState } from 'react';
import { Button } from '@material-ui/core'
import { storage, db } from './firebase';
import './ImageUpload.css';
import firebase from 'firebase';

function ImageUpload({username}) {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
        "state_changed",
        (snapshot) => {
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
        },
        (error) => {
            console.log(error);
            alert(error.message);
        },
        () => {
            storage
             .ref("images")
             .child(image.name)
             .getDownloadURL()
             .then(url => {
                // post image into db
                 db.collection("posts").add({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    caption: caption,
                    imageUrl: url,
                    username: username
                 })
                 setProgress(0);
                 setCaption("");
                 setImage(null);
             });
        }
    );   
};

    return (
        <div className="imageupload">
            <Button onClick={handleUpload}>
            Upload
            </Button>
            <input type="file" onChange={handleChange} />
            <progress className="imageupload_progress" value={progress} max="100"/>
            <input type="text" placeholder="Type caption here.." onChange={event => setCaption(event.target.value)} value={caption}/>
        </div>
    )
}

export default ImageUpload