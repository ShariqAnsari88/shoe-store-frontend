/* eslint-disable react/prop-types */
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

function Layout(props) {
  const Component = props.component
  return (
    <div>
      <Component {...props.pageProps} />
      {process.env.NODE_ENV !== 'development' && <Analytics />}
      {process.env.NODE_ENV !== 'development' && <SpeedInsights />}
    </div>
  )
}

export default Layout
