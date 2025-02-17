import { useState } from 'react';
import { FaMoneyBill, FaFileDownload } from 'react-icons/fa';
import PaymentModal from '../payment/PaymentModal';

const Print = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);

  const handlePaymentClick = () => {
    console.log('Opening payment modal...');
    setShowPaymentModal(true);
  };

  const handleDownloadClick = () => {
    window.print();
  };

  const handlePaymentSuccess = () => {
    setHasPaid(true);
    setShowPaymentModal(false);
  };

  return (
    <>
      {!hasPaid ? (
        // Payment Button
        <div className="fixed bottom-4 right-4 exclude-print z-50">
          <button
            onClick={handlePaymentClick}
            className="bg-[rgb(42,167,69)] text-white px-6 py-3 rounded-lg hover:bg-[rgb(42,167,69)]/90 flex items-center gap-2 group relative"
          >
            <FaMoneyBill className="text-xl" />
            <span>Pay to Download</span>
            
            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 w-48 bg-gray-800 text-white text-xs rounded p-2 hidden group-hover:block">
              Pay 500 TZS to download your resume in PDF format
            </div>
          </button>
        </div>
      ) : (
        // Download Button
        <div className="fixed bottom-4 right-4 exclude-print z-50">
          <button
            onClick={handleDownloadClick}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <FaFileDownload className="text-xl" />
            <span>Download PDF</span>
          </button>
        </div>
      )}

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
      />
    </>
  );
};

export default Print; 