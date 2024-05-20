import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html>
      <head>
        <title>My App</title>
        <link rel="stylesheet" href="/global.css" />
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default Layout;