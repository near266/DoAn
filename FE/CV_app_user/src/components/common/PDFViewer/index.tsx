import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Chỉ định URL của tập tin PDF dựa trên đường dẫn nhận được từ tải lên
const PdfViewer = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  // Xử lý lỗi khi tải tập tin PDF
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

  return (
    <div>
      <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Trang {pageNumber} / {numPages}
      </p>
    </div>
  );
};

export default PdfViewer;
