import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  MapContainer,
  TileLayer,
  Marker,
  CircleMarker,
  Popup,
} from "react-leaflet";
import { useSession } from "next-auth/react";

function Map({ data }) {
  const { data: session, status } = useSession();

  console.log(session);

  return (
    <main>
      <div>
        <MapContainer
          className="d w-[100%] h-[100vh] z-1"
          center={[40.609787846393196, 20.7890265133657]}
          zoom={5}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {data.map((item) => (
            <CircleMarker
              key={item._id}
              className="n w-[150px] h-[150px]"
              center={[item.title, item.description]}
              radius={10}
              color="transparent"
              fillColor="green"
              fillOpacity={0.5}
            >
              <Popup className="w-[460px] h-[150px]">
                <p className="text-[25px]">My Location </p>
                <div className=" mb-[10px] text-[20px] ">
                  Username: <b className="text-[#3c9ef9]">{item.text}</b>
                </div>
                <Link
                  className="d mt-[15px] text-[20px] text-[#3c9ef9]"
                  href="/add"
                >
                  Add a location
                </Link>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </main>
  );
}

export default Map;
