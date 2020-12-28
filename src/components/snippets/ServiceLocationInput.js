import React, { useState, useEffect, useRef } from "react";
import $ from 'jquery';

let autoComplete;

const loadScript = (url, callback) => {
    let script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState) {
        script.onreadystatechange = function() {
            if (script.readyState === "loaded" || script.readyState === "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {
        script.onload = () => callback();
    }

    script.src = url;
    // document.body.appendChild(script);
    document.getElementsByTagName("head")[0].appendChild(script);
};

function handleScriptLoad(updateQuery, autoCompleteRef, props) {
    autoComplete = new window.google.maps.places.Autocomplete(
        autoCompleteRef.current,
        { componentRestrictions: { country: "au" } }
    );
    // $(autoCompleteRef.current).on('input',function(){
    //     var str = autoCompleteRef.current.value;
    //     var prefix = 'Bendigo, ';
    //         if(str.indexOf(prefix) == 0) {
    //             console.log(autoCompleteRef.current.value);
    //         } else {
    //             if (prefix.indexOf(str) >= 0) {
    //             autoCompleteRef.current.value = prefix;
    //             } else {
    //                 autoCompleteRef.current.value = prefix+str;
    //             }
    //         }
    // });
    autoComplete.setFields(["address_component", "name", "geometry"]);
    autoComplete.addListener("place_changed", () =>{
        handlePlaceSelect(updateQuery, props)
    }
    );
}

async function handlePlaceSelect(updateQuery, props) {
    const addressObject = autoComplete.getPlace();
    const query = addressObject.formatted_address;
    updateQuery(query);
    let loc = '';
    let administrative = false;
    let route = false
    props.setLocation({lat:addressObject.geometry ? addressObject.geometry.location.lat() :'', lng:addressObject.geometry ? addressObject.geometry.location.lng():''}, props.skipLoad ? 'To': 'From')
    console.log('selection', addressObject.address_components)
    addressObject && addressObject.address_components && addressObject.address_components.map((value)=>{
        // if(value.types && value.types.includes("locality") && value.long_name.includes("Bendigo")){
        if(value.types && value.types.includes("administrative_area_level_2") && value.long_name.includes("Greater Bendigo City")){
            administrative = true
        }

        if(loc === ''){
            loc = value.short_name;
        }else{
            loc = loc + " " + value.short_name
        }
    })
    addressObject && addressObject.address_components && addressObject.address_components.map((value)=>{
        // if(value.types && value.types.includes("locality") && value.long_name.includes("Bendigo")){
        if(value.types && value.types.includes("route") || value.types.includes("street_number") || value.types.includes("plus_code")){
            route = true
        }
    })
    if(administrative && route){
        props.setLocation(loc,'picking');
        props.setValid(true);
    }else{
        props.setValid(false);
    }
}

function SearchLocationInput(props) {
    const [query, setQuery] = useState("");
    const autoCompleteRef = useRef(null);

    useEffect(() => {
            loadScript(
                `https://maps.googleapis.com/maps/api/js?key=${process.env.GATSBY_APP_GOOGLE_API_KEY}&libraries=places`,
                () => handleScriptLoad(setQuery, autoCompleteRef, props)
            );
    }, []);
    function onChange(event){
        let count= sessionStorage.getItem('book-limit') && JSON.parse(sessionStorage.getItem('book-limit')).count;
        sessionStorage.setItem('book-limit', JSON.stringify({
            date:new Date(), 
            count: count ? count+1 : 1}));
        setQuery(event.target.value); 
        props.setLocation(event.target.value,'picking')
    }
    return (
        <input
            className="form-control"
            ref={autoCompleteRef}
            onChange={event => {onChange(event)}}
            placeholder="Enter Place Name"
            value={props.value}
            style={{width:"100%"}}
        />
    );
}

export default SearchLocationInput;