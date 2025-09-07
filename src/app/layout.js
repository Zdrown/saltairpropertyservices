import './globals.css';

export const metadata = {
  title: "Salt Air Property Services - Cape Cod Property Management",
  description: "Professional property services for Cape Cod homes. 30+ years of federal emergency management expertise from FEMA and Department of Homeland Security.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
