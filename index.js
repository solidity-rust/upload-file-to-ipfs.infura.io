import React, { Fragment, useState } from "react";
import { create } from 'ipfs-http-client';

const client = create('https://ipfs.infura.io:5001/api/v0');

const App = () => {    
    const [fileUrl, updateFileUrl] = useState(``)
    const onChange = async (e) => {
      const file = e.target.files[0]
      try {
        const added = await client.add(file)
        const url = `https://ipfs.infura.io/ipfs/${added.path}`;
        updateFileUrl(url)
      } catch (error) {
        console.log('Error uploading file: ', error)
      }  
    }
    return(
      <Fragment>
        <h1>IPFS Example</h1>
        <input
          type="file"
          onChange={onChange}
        />
        {
          fileUrl && (
            <img src={fileUrl} width="600px" />
          )
        }
      </Fragment>
    )
}

export default App;