
import Banner from './Banner'
import Footer from './Footer'
import Navigation from './navigation/Navigation'

interface ContainerProps {
  className?: string
  children: JSX.Element | JSX.Element[]
}

export default function Container({ className,children }: ContainerProps) {
  return (
    <div>
      <Navigation />
      <div className={`${className ?? 'md:mt-44 mt-12'}`}>{children}</div>
      <Banner />

      <Footer />
    </div>
  )
}
