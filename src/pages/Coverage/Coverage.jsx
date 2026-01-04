import { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// 🧭 Custom marker icon
const customIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2776/2776067.png",
    iconSize: [30, 30],
});

// 🇧🇩 64 Districts of Bangladesh with coordinates
const districtData = [
    { district: "Bagerhat", region: "Khulna", lat: 22.6516, lon: 89.7859 },
    { district: "Bandarban", region: "Chattogram", lat: 21.8311, lon: 92.3686 },
    { district: "Barguna", region: "Barisal", lat: 22.1435, lon: 90.1261 },
    { district: "Barishal", region: "Barisal", lat: 22.7010, lon: 90.3535 },
    { district: "Bhola", region: "Barisal", lat: 22.6859, lon: 90.6482 },
    { district: "Bogura", region: "Rajshahi", lat: 24.8465, lon: 89.3770 },
    { district: "Brahmanbaria", region: "Chattogram", lat: 23.9570, lon: 91.1110 },
    { district: "Chandpur", region: "Chattogram", lat: 23.2333, lon: 90.6667 },
    { district: "Chattogram", region: "Chattogram", lat: 22.3569, lon: 91.7832 },
    { district: "Chuadanga", region: "Khulna", lat: 23.6400, lon: 88.8410 },
    { district: "Cox's Bazar", region: "Chattogram", lat: 21.4272, lon: 91.9824 },
    { district: "Cumilla", region: "Chattogram", lat: 23.4607, lon: 91.1809 },
    { district: "Dhaka", region: "Dhaka", lat: 23.8103, lon: 90.4125 },
    { district: "Dinajpur", region: "Rangpur", lat: 25.6270, lon: 88.6332 },
    { district: "Faridpur", region: "Dhaka", lat: 23.6071, lon: 89.8429 },
    { district: "Feni", region: "Chattogram", lat: 23.0166, lon: 91.3966 },
    { district: "Gaibandha", region: "Rangpur", lat: 25.3297, lon: 89.5457 },
    { district: "Gazipur", region: "Dhaka", lat: 23.9999, lon: 90.4203 },
    { district: "Gopalganj", region: "Dhaka", lat: 23.0083, lon: 89.8266 },
    { district: "Habiganj", region: "Sylhet", lat: 24.3740, lon: 91.4155 },
    { district: "Jamalpur", region: "Mymensingh", lat: 24.9375, lon: 89.9375 },
    { district: "Jashore", region: "Khulna", lat: 23.1664, lon: 89.2081 },
    { district: "Jhalokathi", region: "Barisal", lat: 22.6406, lon: 90.1987 },
    { district: "Jhenaidah", region: "Khulna", lat: 23.5448, lon: 89.1538 },
    { district: "Joypurhat", region: "Rajshahi", lat: 25.0968, lon: 89.0236 },
    { district: "Khagrachari", region: "Chattogram", lat: 23.1193, lon: 91.9847 },
    { district: "Khulna", region: "Khulna", lat: 22.8456, lon: 89.5403 },
    { district: "Kishoreganj", region: "Dhaka", lat: 24.4449, lon: 90.7766 },
    { district: "Kurigram", region: "Rangpur", lat: 25.8072, lon: 89.6295 },
    { district: "Kushtia", region: "Khulna", lat: 23.9020, lon: 89.1203 },
    { district: "Lakshmipur", region: "Chattogram", lat: 22.9425, lon: 90.8412 },
    { district: "Lalmonirhat", region: "Rangpur", lat: 25.9923, lon: 89.2847 },
    { district: "Madaripur", region: "Dhaka", lat: 23.1641, lon: 90.1890 },
    { district: "Magura", region: "Khulna", lat: 23.4854, lon: 89.4194 },
    { district: "Manikganj", region: "Dhaka", lat: 23.8617, lon: 90.0011 },
    { district: "Meherpur", region: "Khulna", lat: 23.7622, lon: 88.6318 },
    { district: "Moulvibazar", region: "Sylhet", lat: 24.4829, lon: 91.7774 },
    { district: "Munshiganj", region: "Dhaka", lat: 23.5450, lon: 90.5350 },
    { district: "Mymensingh", region: "Mymensingh", lat: 24.7471, lon: 90.4203 },
    { district: "Naogaon", region: "Rajshahi", lat: 24.8056, lon: 88.9408 },
    { district: "Narail", region: "Khulna", lat: 23.1654, lon: 89.4993 },
    { district: "Narayanganj", region: "Dhaka", lat: 23.6238, lon: 90.5000 },
    { district: "Narsingdi", region: "Dhaka", lat: 23.9200, lon: 90.7180 },
    { district: "Natore", region: "Rajshahi", lat: 24.4200, lon: 89.0000 },
    { district: "Nawabganj", region: "Rajshahi", lat: 24.6000, lon: 88.2833 },
    { district: "Netrakona", region: "Mymensingh", lat: 24.8836, lon: 90.7299 },
    { district: "Nilphamari", region: "Rangpur", lat: 25.9310, lon: 88.8560 },
    { district: "Noakhali", region: "Chattogram", lat: 22.8696, lon: 91.0995 },
    { district: "Pabna", region: "Rajshahi", lat: 24.0000, lon: 89.2500 },
    { district: "Panchagarh", region: "Rangpur", lat: 26.3411, lon: 88.5542 },
    { district: "Patuakhali", region: "Barisal", lat: 22.3596, lon: 90.3296 },
    { district: "Pirojpur", region: "Barisal", lat: 22.5841, lon: 89.9720 },
    { district: "Rajbari", region: "Dhaka", lat: 23.7570, lon: 89.6440 },
    { district: "Rajshahi", region: "Rajshahi", lat: 24.3745, lon: 88.6042 },
    { district: "Rangamati", region: "Chattogram", lat: 22.7324, lon: 92.2985 },
    { district: "Rangpur", region: "Rangpur", lat: 25.7439, lon: 89.2752 },
    { district: "Satkhira", region: "Khulna", lat: 22.7085, lon: 89.0715 },
    { district: "Shariatpur", region: "Dhaka", lat: 23.2423, lon: 90.4348 },
    { district: "Sherpur", region: "Mymensingh", lat: 25.0181, lon: 90.0176 },
    { district: "Sirajganj", region: "Rajshahi", lat: 24.4534, lon: 89.7007 },
    { district: "Sunamganj", region: "Sylhet", lat: 25.0658, lon: 91.3950 },
    { district: "Sylhet", region: "Sylhet", lat: 24.8917, lon: 91.8833 },
    { district: "Tangail", region: "Dhaka", lat: 24.2513, lon: 89.9167 },
    { district: "Thakurgaon", region: "Rangpur", lat: 26.0339, lon: 88.4617 },
];

// 🧭 Custom map controller
function MapController({ selectedDistrict }) {
    const map = useMap();

    if (selectedDistrict) {
        map.flyTo([selectedDistrict.lat, selectedDistrict.lon], 10, { duration: 1.5 });
    }
    return null;
}


function Coverage() {

    const [search, setSearch] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const markerRefs = useRef([]);

    // 🔍 Search Handler
    const handleSearch = (e) => {
        e.preventDefault();

        const found = districtData.find((d) =>
            d.district.toLowerCase().includes(search.toLowerCase())
        );

        if (found) {
            setSelectedDistrict(found);
            const marker = markerRefs.current[districtData.indexOf(found)];
            if (marker) marker.openPopup();
        } else {
            alert("District not found!");
        }
    };

    return (
        <div className='min-h-screen mt-4 md:mt-8 bg-white rounded-xl md:rounded-2xl py-6 md:py-10 lg:py-20 px-6 md:px-9 lg:px-28'>
            <h1 className='text-2xl md:text-3xl lg:text-5xl font-bold'>We are available in 64 districts</h1>

            {/* 🔍 Search Box */}
            <form onSubmit={handleSearch} className="mt-4 md:mt-6 lg:mt-12">
                <input
                    type="text"
                    placeholder="Search here"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="input border-none bg-[#CBD5E14D] w-56 md:w-72 rounded-full"
                />
                <button className="btn bg-primary ml-2 rounded-full px-6 font-bold border-none">Search</button>
            </form>

            {/* divider */}
            <hr class="border-t-1 border-[#0000001A] mt-4 md:mt-6 lg:mt-12" />

            <h2 className='text-lg md:text-2xl lg:text-3xl font-bold mt-4 md:mt-6 lg:mt-12'>We deliver almost all over Bangladesh</h2>

            {/* map */}
            <div className="max-w-full h-[426px] rounded-lg overflow-hidden shadow-lg z-0 relative mt-4 md:mt-6 lg:mt-12">
                <MapContainer
                    center={[23.685, 90.3563]}
                    zoom={7}
                    scrollWheelZoom={false}
                    style={{ height: "100%", width: "100%", zIndex: 0 }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                    />

                    {districtData.map((d, i) => (
                        <Marker
                            key={i}
                            position={[d.lat, d.lon]}
                            icon={customIcon}
                            ref={(el) => (markerRefs.current[i] = el)}
                        >
                            <Popup>
                                <h3 className="font-bold text-lg text-primary">{d.district}</h3>
                                <p>Region: {d.region}</p>
                            </Popup>
                        </Marker>
                    ))}

                    <MapController selectedDistrict={selectedDistrict} />
                </MapContainer>
            </div>

        </div>
    )
}

export default Coverage