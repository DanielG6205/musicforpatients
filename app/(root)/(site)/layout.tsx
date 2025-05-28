import Nav from "../../components/NavBar"

export default function Layout({children} : Readonly<{children: React.ReactNode}>){
    return(
        <main className = "font-work-sans">
            <Nav />
            {children}
        </main>
    )

}