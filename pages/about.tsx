import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Markdown from 'react-markdown'

import Container from '@/components/Container'
import Wrapper from '@/components/Wrapper'
import { about } from '@/utils/markdowns'

function About() {
	const { locale } = useRouter()
	const { t } = useTranslation('about')
	return (
		<Container>
			<div className="bg-about bg-center bg-cover bg-fixed bg-no-repeat">
				<Wrapper className="flex flex-col justify-center items-center min-h-[800px] backdrop-blur-xl min-w-full py-10">
					<h2 className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-center pb-10">
						{t('who_are_we')}
					</h2>
					<div className="border border-1 md:w-[85%] gap-5 items-center justify-between">
						<Markdown className="about-us prose p-4 text-[18px] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-offWhite">
							{about[locale]}
						</Markdown>
					</div>
				</Wrapper>
			</div>
		</Container>
	)
}

export default About

export async function getServerSideProps(ctx) {
	const { locale } = ctx

	return {
		props: {
			...(await serverSideTranslations(locale, [
				'about',
				'footer',
				'nav',
				'banner',
			])),
		},
	}
}
