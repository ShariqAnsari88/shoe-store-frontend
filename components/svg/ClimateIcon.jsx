// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { ReactSVG } from 'react-svg'
const ClimateIcon = () => (
  <ReactSVG
    wrapper="span"
    beforeInjection={(svg) => {
      svg.classList.add('svg-class-name')
      svg.setAttribute('style', 'width: 40px')
    }}
    width="12"
    
    height="12"
    src="/svg/stripe_climate.svg"
  />
)

export default ClimateIcon
