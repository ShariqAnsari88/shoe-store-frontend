interface Props {
  description: string;
  title: string;
  thumbnailSrc: string;
  minutesRead: number;
  createdAt: string | Date
}

const FeaturedBlog = ({
  title,
  description,
  thumbnailSrc,
  minutesRead,
  createdAt
}: Partial<Props>) => {
  return <div></div>
}

export default FeaturedBlog
