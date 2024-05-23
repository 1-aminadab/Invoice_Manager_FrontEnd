# Invoice Manager Frontend

## Overview

The frontend of the "Invoice Manager" application is built using Next.js, providing a modern and efficient user interface for managing invoices. This application allows users to create, view, update, and delete invoices, and includes features for exporting invoices to PDF and Excel formats.

## Technology Stack

- **Frontend Framework:** Next.js
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit
- **State Persistence:** Redux Persist
- **PDF Export:** Libraries like jsPDF or similar
- **Excel Export:** Libraries like SheetJS or similar

## Prerequisites

- Node.js
- npm or yarn

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository_url>
cd invoice-manager/frontend
2. Install Dependencies
bash
Copy code
npm install
or

bash
Copy code
yarn install
3. Set Up Environment Variables
Create a .env.local file in the root directory and add the following variables:

env
Copy code
NEXT_PUBLIC_API_URL=http://localhost:3000
Adjust the API URL according to your backend server configuration.

4. Start the Frontend Server
bash
Copy code
npm run dev
or

bash
Copy code
yarn dev
The frontend server should now be running on http://localhost:3000.

Project Structure
plaintext
Copy code
┌ ○ /                                    223 kB          388 kB
├ ○ /_not-found                          875 B          88.2 kB
├ ○ /invoice                             142 B          87.5 kB
├ ○ /product                             1.35 kB         167 kB
├ ○ /signin                              504 B           107 kB
└ ○ /signup                              504 B           107 kB
Key Features
Invoice Management
Create Invoice: Add a new invoice with details such as client information, itemized list of products/services, total amount, and due date.
View Invoices: Display a list of all invoices with basic details.
Update Invoice: Edit the details of an existing invoice.
Delete Invoice: Remove an invoice from the system.
Export Functionality
PDF Export: Export individual invoices as PDF documents.
Excel Export: Export all invoices or selected invoices as an Excel file.
Authentication
Sign Up: Create a new user account.
Sign In: Log in with existing user credentials.
Token Management: Securely handle authentication tokens with JWT.
Responsive Design
The application is designed to be responsive, ensuring a seamless user experience on both desktop and mobile devices.

Customization
Tailwind CSS
Tailwind CSS is used for styling the application. You can customize the styles by editing the tailwind.config.js file and the global styles in the styles directory.

State Management
Redux Toolkit is used for state management, with Redux Persist to maintain the state across sessions. You can add new slices or modify existing ones in the redux/slices directory.

Deployment
Render
The frontend is configured to be easily deployed on Render. Follow these steps to deploy:

Sign Up / Log In to your Render account.

Create a New Web Service:

Go to the Render dashboard.
Click on the "New" button and select "Web Service".
Connect your repository from GitHub.
Configure the Service:

Set the Build Command to:
bash
Copy code
npm install && npm run build
Set the Start Command to:
bash
Copy code
npm start
Set the Environment Variables as needed (e.g., NEXT_PUBLIC_API_URL).
Deploy:

Click on "Create Web Service" to start the deployment process.
Render will automatically build and deploy your application. You can monitor the deployment process and logs through the Render dashboard.

Conclusion
This README provides the necessary information to set up and run the frontend for the "Invoice Manager" application. The frontend is designed to be user-friendly, responsive, and easily customizable. If you encounter any issues or have any questions, please refer to the documentation or open an issue in the repository.an monitor the deployment process and logs through the Render dashboard.

Conclusion
This README provides the necessary information to set up and run the frontend for the "Invoice Manager" application. The frontend is designed to be user-friendly, responsive, and easily customizable. If you encounter any issues or have any questions, please refer to the documentation or open an issue in the repository.
