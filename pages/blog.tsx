import { NextPage, GetStaticProps } from 'next'

import FeaturedBlog from '@/components/blog/FeaturedBlog'
import Wrapper from '@/components/Wrapper'

interface Props {}

// eslint-disable-next-line no-empty-pattern
const Blog: NextPage<Props> = ({}) => {
  return <Wrapper>
    <FeaturedBlog />
  </Wrapper>
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { locale } = ctx
  return {
    props: {}
  }
}

export default Blog