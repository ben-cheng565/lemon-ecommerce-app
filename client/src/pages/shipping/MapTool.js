import React, { useEffect, useRef, useState } from "react";
import {
  LoadScript,
  GoogleMap,
  StandaloneSearchBox,
  Marker,
} from "@react-google-maps/api";
import LoadingBox from "../../components/common/LoadingBox";

import "./MapTool.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { USER_MAP_ADDRESS } from "../../redux/actionTypes";

const libs = ["places"];
const defaultLocation = { lat: -36.85, lng: 174.76 };

function MapTool(props) {
  const dispatch = useDispatch();
  const [googleApiKey, setGoogleApiKey] = useState("");
  const [center, setCenter] = useState(defaultLocation);
  const [location, setLocation] = useState(center);

  const mapRef = useRef(null);
  const placeRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get("/config/google");
      setGoogleApiKey(data);
      getUserCurrentLocation();
    };

    fetch();
  }, []);

  const onLoad = (map) => {
    mapRef.current = map;
  };

  const onMarkLoad = (marker) => {
    markerRef.current = marker;
  };

  const onLoadPlaces = (place) => {
    placeRef.current = place;
  };

  const onIdle = () => {
    setLocation({
      lat: mapRef.current.center.lat(),
      lng: mapRef.current.center.lng(),
    });
  };

  const onPlacesChanged = () => {
    const place = placeRef.current.getPlaces()[0].geometry.location;
    setCenter({ lat: place.lat(), lng: place.lng() });
    setLocation({ lat: place.lat(), lng: place.lng() });
  };

  const onConfirm = () => {
    const places = placeRef.current.getPlaces();
    console.log(places);
    if (places && places.length === 1) {
      dispatch({
        type: USER_MAP_ADDRESS,
        payload: {
          lat: location.lat,
          lng: location.lng,
          address:
            places[0].address_components[0].short_name +
            " " +
            places[0].address_components[1].short_name +
            ", " +
            places[0].address_components[2].short_name,
          name: places[0].name,
          city: places[0].address_components[3].short_name,
          country: places[0].address_components[5].short_name,
          postalCode: places[0].address_components[6].short_name,
          googleAddressId: places[0].id,
        },
      });

      alert("Location selected successfully.");
      props.history.push(`/shipping`);
    } else {
      alert("Please enter your address.");
    }
  };

  const getUserCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation os is not supported by this browser.");
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  };

  return !googleApiKey ? (
    <LoadingBox />
  ) : (
    <div className="full-container">
      <LoadScript libraries={libs} googleMapsApiKey={googleApiKey}>
        <GoogleMap
          id="google-map"
          mapContainerStyle={{ height: "100%", width: "100%" }}
          center={center}
          zoom={15}
          onLoad={onLoad}
          onIdle={onIdle}
        >
          <StandaloneSearchBox
            onLoad={onLoadPlaces}
            onPlacesChanged={onPlacesChanged}
          >
            <div className="map-input-box">
              <input type="text" placeholder="Enter your address"></input>
              <button type="button" onClick={onConfirm}>
                Confirm
              </button>
            </div>
          </StandaloneSearchBox>
          <Marker position={location} onLoad={onMarkLoad}></Marker>
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default MapTool;
