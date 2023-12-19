import NavBar from "../components/NavBar"
import {Roboto} from "next/font/google"

export const metadata = {
  title: 'Test next',
  description: 'App para probar nextJS',
}

const fontRoboto = Roboto(
  {
    weight: ["100" , "300" , "400" , "500" , "700" ],
    styles: ["normal" , "italic"],
    subsets: ['latin']
  }
)

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={fontRoboto.className}>
        <NavBar />
        
        {children}
        
      </body>
    </html>
  )
}
