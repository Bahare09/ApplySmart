import React, { useState, useEffect } from 'react';

function PdfViewer({ pdfData }) {
    const [pdfUrl, setPdfUrl] = useState(null);
    const [coverUrl, setCoverUrl] = useState(null);

    useEffect(() => {
        const cvByteArray = Object.values(pdfData.pdfBytes);
        const coverByteArray = Object.values(pdfData.coverpdfBytes);

        const uint8Array = new Uint8Array(cvByteArray);
        const coveruint8Array = new Uint8Array(coverByteArray);

        const cvPdfBlob = new Blob([uint8Array], { type: 'application/pdf' });
        const coverPdfBlob = new Blob([coveruint8Array], { type: 'application/pdf' });

        const CvUrl = URL.createObjectURL(cvPdfBlob);
        const coverUrl = URL.createObjectURL(coverPdfBlob);

        setPdfUrl(CvUrl);
        setCoverUrl(coverUrl)

        return () => URL.revokeObjectURL(CvUrl);
    }, [pdfData]);

    return (
        <div>
            {pdfUrl ? (
                <>
                    <iframe
                        src={pdfUrl}
                        width="50%"
                        height="500"
                        title="PDF Viewer"
                        style={{ border: 'none' }}
                    ></iframe>
                    <iframe
                        src={coverUrl}
                        width="50%"
                        height="500"
                        title="PDF Viewer"
                        style={{ border: 'none' }}
                    ></iframe>
                </>
            ) : (
                <p>Loading PDF...</p>
            )}
        </div>
    );
}

export default PdfViewer;
