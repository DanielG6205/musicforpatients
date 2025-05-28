import Footer from "../components/Footer"
import React from "react";

export default function Layout({children} : Readonly<{children: React.ReactNode}>){
    return(
        <html lang="en">
            <body>{children}</body>
            <Footer />
        </html>
    )

}