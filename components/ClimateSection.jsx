import Link from 'next/link'

import ClimateIcon from './svg/ClimateIcon'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ClimateSection(props) {
	return (
		<div
			className={`shadow-md flex items-center justify-center
     `}
		>
			<Link
				target="_blank"
				rel="noopener noreferrer"
				href="https://climate.stripe.com/gJpCUa"
				className="flex-row p-4 sm:m-0 my-6 flex items-center justify-center 
        hover:cursor-pointer hover:bg-offWhite transition duration-300 ease-in-out gap-2"
			>
				<ClimateIcon />
				<p className="font-semibold
        text-[16px]
        hover:cursor-pointer 
        transition 
        duration-300 
        ease-in-out 
        text-transparent 
        bg-clip-text
        bg-gradient-to-b
        from-[#00D522] 
        to-[#FFD44B] 
        text-center capitalize">
          stripe climate member
				</p>
			</Link>
		</div>
	)
}

export default ClimateSection
