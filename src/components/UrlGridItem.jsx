import { useEffect, useState } from "react";

export const UrlGridItem = ({ Urls='' }) => {

    const [CopyUrl, setCopyUrl] = useState(undefined)

    const copyToClipBoard = () => {

        var content = document.getElementById('copy-link');
        
        content.select();
        document.execCommand('copy')

        setCopyUrl('copied')

    }

    return (

        <>

            {Urls.shortUrl != ''
                ?
                <ul>
                    {
                        Urls.map(Url => (
                            <li
                                key={Url.shortUrl}
                            >
                                <div id="shortcuts-wrap">
                                    <div className="shortcut-container">
                                        <span className="shortcut-long">{Url.longUrl}</span>
                                        <div className="copy-container">
                                            <textarea 
                                                onChange={() => ChangeArea()}
                                                name="copy-area" 
                                                value={`https://${Url.shortUrl}`} 
                                                id='copy-link' 
                                                className="shortcut-short"
                                            ></textarea>
                                            <button 
                                                onClick={() => copyToClipBoard()} 
                                                className={`shortcut-button ${CopyUrl ? 'copied' : ''}`}
                                            > { CopyUrl ? 'Copied!' : 'Copy' }
                                            </button>
                                            <script src="clipboard.min.js"></script>
                                        </div>
                                    </div>
                                </div>

                            </li>
                        ))
                    }
                </ul>

                : (<div></div>)
            }



        </>

    )
}

export default UrlGridItem