import Footer from "../components/Footer"
import React from "react";
import AOSInitializer from "../components/AOSInitializer";

export default function Layout({children} : Readonly<{children: React.ReactNode}>){
    return(
        <main className = "font-work-sans">
            <AOSInitializer />
            {children}
            <Footer />
        </main>
    )

}
