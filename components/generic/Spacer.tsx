interface Props {
  className?: string
}

function Spacer({ className, ...props }: Props) {
  return <div className={`${className ?? 'w-28 h-12'}`}/>
}

export default Spacer