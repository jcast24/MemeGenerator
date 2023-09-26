// import memeData from "../memesData"
import {useState} from "react";
import {useEffect} from "react";
export default function Input() {
    const [memeImage, setMemeImage] = useState({
        topText: '',
        bottomText: '',
        randomImage: "http://i.imgflip.com/1bij.jpg"
    });

    const [allMemes, setAllMemes] = useState([])

    useEffect(() => {
        // fetch("https://api.imgflip.com/get_memes")
        //     .then(res => res.json)
        //     .then(data => setAllMemes(data.data.memes))

        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
        }

        getMemes();

    }, [])
    function getNewImage() {
        // let memesArray = memeData.data.memes;
        const getRandomIndex = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[getRandomIndex].url;
        setMemeImage(prevImage => ({
            ...prevImage,
            randomImage: url
        }));
    }

    return (
        <main>
            <div className="form">
                <input type="text" className="form-input"/>
                <input type="text" className="form-input"/>
                <button onClick={getNewImage} className="form-button">Get New Meme!</button>
            </div>
            <img alt={"MEMEimages"} className={"meme-image"} src={memeImage.randomImage}/>
        </main>
    )
}