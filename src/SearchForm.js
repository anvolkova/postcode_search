import React from "react";

export default function SearchForm(props){
    return <form onSubmit={props.onFormSubmit}>
            <div>
                <label htmlFor="postcode">Postcode: </label>
                <input type="text" id="postcode" className="textfield" placeholder="2000" value={props.postcode} onChange={props.onPostcodeChange} />
            </div>
            <div>
                <label htmlFor="suburb">Suburb: </label>
                <input type="text" id="suburb" className="textfield" placeholder="Sydney" value={props.suburb} onChange={props.onSuburbChange} />
            </div>
            <div>
                <label htmlFor="state">State: </label>
                <select id="state" value={props.state} onChange={props.onStateChange}>
                <option value="">Choose a state</option>
                <option value="NSW">NSW</option>
                <option value="VIC">VIC</option>
                <option value="TAS">TAS</option>
                <option value="SA">SA</option>
                <option value="WA">WA</option>
                <option value="QLD">QLD</option>
                <option value="NT">NT</option>
                <option value="ACT">ACT</option>
            </select>
            </div>
            <div className="form-footer">
                <input type="submit" className="btn btn-primary" value="Submit" />
            </div>
            <div className="validation-message">{props.validation}</div>
        </form>
}
