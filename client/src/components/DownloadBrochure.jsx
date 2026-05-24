import React from 'react';
import { FaDownload } from 'react-icons/fa';
import toast from 'react-hot-toast';

function DownloadBrochure({ property }) {
    const downloadPDF = () => {
        const content = `
            PROPERTY BROCHURE
            =================
            Title: ${property.title}
            Price: Rs. ${property.price?.toLocaleString()}
            Location: ${property.location?.address}, ${property.location?.city}
            Bedrooms: ${property.bedrooms}
            Bathrooms: ${property.bathrooms}
            Area: ${property.area} sqft
            Description: ${property.description}
            Amenities: ${property.amenities?.join(', ')}
        `;
        const blob = new Blob([content], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${property.title}.txt`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success('Brochure downloaded!');
    };

    return (
        <button onClick={downloadPDF} style={{ background: '#ff9800', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '25px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', marginTop: '10px' }}>
            <FaDownload /> Download Brochure
        </button>
    );
}

export default DownloadBrochure;
