
import Footer from './Footer'
import Navigation from './navigation/Navigation'

interface ContainerProps {
  className?: string
  children: JSX.Element | JSX.Element[]
}

export default function Container({ children }: ContainerProps) {
  return (
    <div>
      <Navigation />
      <div className='sm:mt-24 md:mt-40 mt-32'>{children}</div>
      <Footer />
    </div>
  )
}
