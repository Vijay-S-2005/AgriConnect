"use client";
import { useRef } from "react";
import html2pdf from "html2pdf.js";
import InvoiceTemplate from "../../../../components/InvoiceTemplate"; // Adjust the path based on where your InvoiceTemplate is located

export default function SuccessPage() {
  const invoiceRef = useRef();

  const downloadInvoice = () => {
    const element = invoiceRef.current;
    const opt = {
      margin: 1,
      filename: `invoice.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    // Generate PDF and download
    html2pdf().from(element).set(opt).save();
  };

  // Sample data for invoice
  const invoiceData = {
    invoiceDate: "2024-10-13",
    invoiceNumber: "INV12345",
    customerName: "Vijay Kumar",
    orderDate: "2024-10-12",
    totalAmount: 1500,
    paymentMethod: "Credit Card",
  };

  const products = [
    {
      name: "Tomatoes",
      category: "Vegetables",
      quantity: 5,
      price: 30,
      total: 150,
    },
    {
      name: "Potatoes",
      category: "Vegetables",
      quantity: 10,
      price: 25,
      total: 250,
    },
    { name: "Wheat", category: "Grains", quantity: 50, price: 20, total: 1000 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-10 text-center max-w-md mx-auto mt-20">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Payment Successful!
      </h1>
      <p className="text-gray-700 mb-4">Thank you for your purchase.</p>
      <p className="text-gray-700 mb-6">
        Your order has been placed successfully. You can download your invoice
        below:
      </p>

      {/* Hidden InvoiceTemplate for PDF generation */}
      <div style={{ display: "none" }}>
        <div ref={invoiceRef}>
          <InvoiceTemplate invoiceData={invoiceData} products={products} />
        </div>
      </div>

      <button
        onClick={downloadInvoice}
        className="bg-green-600 text-white font-bold py-2 px-6 rounded hover:bg-green-700 transition-all"
      >
        Download Invoice
      </button>

      <p className="text-gray-600 mt-4">
        You can also view your order in the "Your Orders" section.
      </p>
    </div>
  );
}
