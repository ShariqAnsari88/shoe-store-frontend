
import Footer from './Footer'
import Header from './Header'

interface ContainerProps {
  className?: string
  children: JSX.Element | JSX.Element[]
}

export default function Container({ children }: ContainerProps) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
