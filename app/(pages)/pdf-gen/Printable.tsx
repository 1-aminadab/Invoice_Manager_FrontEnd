import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

interface PrintableProps {
  content: React.ReactElement;
}

const Printable: React.FC<PrintableProps> = ({ content }) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div ref={componentRef}>
      {/* Your content to be printed goes here */}
      {content}
      <button onClick={handlePrint}>Print PDF</button>
    </div>
  );
};

export default Printable;