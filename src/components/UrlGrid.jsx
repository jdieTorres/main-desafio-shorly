import axios from "axios";
import { useState } from "react";
import useForm from "../hooks/useForm";
import UrlGridItem from "./UrlGridItem"

export const UrlGrid = () => {

  const [NoLink, setNoLink] = useState(undefined)

  const [Urls, setUrls] = useState([])

  const [{ link }, handleInputChange] = useForm({
    longUrl: ''
  });

  const GetShortUrl = async () => {

    const options = {
      method: 'GET',
      url: `https://api.rebrandly.com/v1/links/new?destination=${link}`,
      headers: { accept: 'application/json', apikey: '7a44322b099d4a79bac99df0c2433236' }
    };

    axios
      .request(options)
      .then(function (response) {

        const { destination } = response.data;
        const { shortUrl } = response.data;

        setUrls([...Urls, {
          longUrl: destination,
          shortUrl: shortUrl,
        }]);

        setNoLink(undefined)

      })
      .catch(function (error) {
        console.error(error);
        setNoLink(true)
      });

  }

  return (
    <>
      {/* <!-- Link Grid --> */}
      <div className="link-grid" >
        <div className="link-container">

          <form>
            <input
              type="text"
              name="link"
              placeholder="Shorten a link here..."
              autoComplete="off"
              value={link}
              onChange={handleInputChange}
            />

          </form>

          <button onClick={() => GetShortUrl()} className="link-button">Shorten It!</button><br/>

          {NoLink
            ? (<span className="error">Please add a link</span>)
            : (<span></span>)
          }

        </div>
      </div>

      {/* <!-- Shortcuts Wrap --> */}


      <UrlGridItem
        Urls={Urls}
      />

    </>
  )

}

export default UrlGrid