// // components/InvoiceSummary.js

// import React from 'react';
// import { Card, Row, Col } from 'shadcn';

// const InvoiceSummary = () => {
//   // Example data
//   const invoice = {
//     invoice_number: 'INV-001',
//     from_customer: 'ABC Corporation',manager
//     to_customer: 'XYZ Ltd.',
//     date_issued: '2024-05-22',
//     due_date: '2024-06-22',
//     status: 'Paid',
//     total_amount: '500.00',
//     tax_amount: '50.00',
//     subtotal: '450.00',
//   };

//   const {
//     invoice_number,
//     from_customer,
//     to_customer,
//     date_issued,
//     due_date,
//     status,
//     total_amount,
//     tax_amount,
//     subtotal,
//   } = invoice;

//   return (
//     <Card className="invoice-summary">
//       <Row gutter={[16, 16]}>
//         <Col span={24}>
//           <h2>Invoice #{invoice_number}</h2>
//         </Col>
//         <Col span={12}>
//           <h3>From</h3>
//           <p>{from_customer}</p>
//         </Col>
//         <Col span={12}>
//           <h3>To</h3>
//           <p>{to_customer}</p>
//         </Col>
//         <Col span={12}>
//           <h3>Date Issued</h3>
//           <p>{date_issued}</p>
//         </Col>
//         <Col span={12}>
//           <h3>Due Date</h3>
//           <p>{due_date}</p>
//         </Col>
//         <Col span={12}>
//           <h3>Status</h3>
//           <p>{status}</p>
//         </Col>
//         <Col span={12}>
//           <h3>Total Amount</h3>
//           <p>${total_amount}</p>
//         </Col>
//         <Col span={12}>
//           <h3>Tax Amount</h3>
//           <p>${tax_amount}</p>
//         </Col>
//         <Col span={12}>
//           <h3>Subtotal</h3>
//           <p>${subtotal}</p>
//         </Col>
//       </Row>
//     </Card>
//   );
// };

// export default InvoiceSummary;
