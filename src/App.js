import React, {useState} from "react";
import './App.css';
import SearchForm from "./SearchForm";

export default function App() {
  const [postcode, setPostcode] = useState("");
  const [suburb, setSuburb] = useState("");
  const [state, setState] = useState("");
  const [validation, setValidation] = useState("");

  async function postcodeSearch(q) {
    try {
      const result = await fetch(`https://digitalapi.auspost.com.au/postcode/search.json?q=${encodeURIComponent(q)}&excludePostBoxFlag=true`, {
        "method": "GET",
        "headers": {
          "AUTH-KEY": "872608e3-4530-4c6a-a369-052accb03ca8"
        }
      });
      const data = (await result.json()).localities.locality;
      if (data) {
        if(!Array.isArray(data)){
          return [data];
        } else {
          return data;
        }
      } else {
        return [];
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function handleFormSubmit(event){
    event.preventDefault();

    setValidation("");

    if(!postcode) {
      setValidation("Please enter a postcode");
      return ;
    }
    if(!postcode.match(/^[0-9]{4}$/)) {
      setValidation("Please enter 4-digit postcode");
      return ;
    }
    if(!suburb) {
      setValidation("Please enter a suburb name");
      return ;
    }
    if(!state) {
      setValidation("Please enter a state");
      return ;
    }

    const locations = await postcodeSearch(postcode);

    const suburbUpperCase = suburb.toUpperCase();
    var foundSuburb = false;
    var foundState = false;

    for(var i in locations) {
      const location = locations[i];
      if(location.location === suburbUpperCase) {
        foundSuburb = true;
        if (location.state === state) {
          foundState = true;
          break;
        }
      }
    }
    
    if(!foundSuburb) {
      setValidation(`The postcode ${postcode} does not match the suburb ${suburb}`);
    } else if(!foundState) {
      setValidation(`The suburb ${suburb} with postcode ${postcode} does not exist in the state ${state}`);
    } else {
      setValidation("The postcode, suburb and state entered are valid");
    }
  }

  return (<>
    <div className="App">
      <header className="App-header">Welcome to Australia Postcodes</header>
      <SearchForm 
              postcode={postcode}
              onPostcodeChange={e => setPostcode(e.target.value)}
              suburb={suburb}
              onSuburbChange={e => setSuburb(e.target.value)}
              state={state}
              onStateChange={e => setState(e.target.value)}
              validation={validation}
              onFormSubmit={handleFormSubmit} />
    </div>
  </>);
}
