import React, { useState, useEffect, useRef } from "react";

let autoComplete2;

function handleScriptLoad(updateQuery, autoCompleteRef, props) {
    autoComplete2 = new window.google.maps.places.Autocomplete(
        autoCompleteRef.current,
        { componentRestrictions: { country: "au" } }
    );
    autoComplete2.setFields(["address_component", "name", "geometry"]);
    autoComplete2.addListener("place_changed", () =>
        handlePlaceSelect(updateQuery, props)
    );
}

async function handlePlaceSelect(updateQuery, props) {
    const addressObject = autoComplete2.getPlace();
    const query = addressObject.formatted_address;
    let loc = '';
    updateQuery(query);
    addressObject && addressObject.address_components && addressObject.address_components.map((value)=>{
        if(loc === ''){
            loc = value.short_name;
        }else{
            loc = loc + " " + value.short_name
        }
    })
    props.setLocation(loc,'droping')
    props.setLocation({lat:addressObject.geometry ? addressObject.geometry.location.lat() : '', lng:addressObject.geometry ? addressObject.geometry.location.lng() : ''}, props.skipLoad ? 'To': 'From')
}

function SearchLocationInput(props) {
    const [query, setQuery] = useState("");
    const autoCompleteRef = useRef(null);

    useEffect(() => {
            handleScriptLoad(setQuery, autoCompleteRef, props)        
    }, []);

    return (
            <input
                className={props.className}
                ref={autoCompleteRef}
                onChange={(event) => {
                    setQuery(event.target.value); 
                    props.setLocation(event.target.value, 'droping')
                    props.updateTrip();
                }}
                placeholder="Enter Place Name"
                value={props.value}
                style={{width:"100%"}}
            />
    );
}

export default SearchLocationInput;