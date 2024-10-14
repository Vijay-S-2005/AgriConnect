import React, { useRef } from "react";
import html2pdf from "html2pdf.js";

const InvoiceTemplate = ({ invoiceData, products }) => {
  const invoiceRef = useRef();

  const handleDownloadPDF = () => {
    const element = invoiceRef.current;
    const opt = {
      margin: 1,
      filename: `${invoiceData.invoiceNumber}.pdf`, // Filename with invoice number
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    // Generate PDF
    html2pdf().from(element).set(opt).save();
  };

  return (
    <div>
      {/* Invoice Content */}
      <div
        className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto mt-6"
        ref={invoiceRef}
      >
        <h1 className="text-2xl font-bold text-center">Agri Connect</h1>
        <p className="text-center text-gray-600">Tax Invoice</p>

        <div className="mt-6">
          <div className="flex justify-between">
            <div>
              <h2 className="font-bold">Invoice Date:</h2>
              <p>{invoiceData.invoiceDate}</p>
            </div>
            <div>
              <h2 className="font-bold">Invoice Number:</h2>
              <p>{invoiceData.invoiceNumber}</p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="font-bold">Customer Details</h2>
            <p>Name: {invoiceData.customerName}</p>
            <p>Order Date: {invoiceData.orderDate}</p>
          </div>

          <table className="table-auto w-full mt-4 border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">S.No</th>
                <th className="px-4 py-2 border">Product Name</th>
                <th className="px-4 py-2 border">Category</th>
                <th className="px-4 py-2 border">Quantity</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border">Total</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{product.name}</td>
                  <td className="px-4 py-2 border">{product.category}</td>
                  <td className="px-4 py-2 border">{product.quantity}</td>
                  <td className="px-4 py-2 border">
                    ₹{product.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 border">
                    ₹{product.total.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-right mt-4">
            <h2 className="font-bold">
              Total Amount: ₹{invoiceData.totalAmount}
            </h2>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-gray-600">Thank you for your purchase!</p>
          <p className="font-bold">
            Mode of Payment: {invoiceData.paymentMethod}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTemplate;
