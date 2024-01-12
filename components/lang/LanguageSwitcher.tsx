import { Tabs, TabsHeader, Tab } from '@material-tailwind/react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const options = [
  { label: 'en', value: 'en' },
  { label: 'it', value: 'it' },
  { label: 'bg', value: 'bg' }
]

interface Props {
  isHeader?: boolean
  textColor?: string
  borderColor?: string
}

export default function LanguageSwitcher({ isHeader, textColor, borderColor }: Props) {
  const { locale } = useRouter()
 
  if (isHeader)
    return (
      <Tabs value={locale}>
        <TabsHeader
          className="rounded-none  bg-transparent p-0"
          indicatorProps={{
            className: `bg-transparent border-b-2 ${
              borderColor ?? 'border-offWhite'
            } shadow-none rounded-none`
          }}
        >
          {options.map(({ label, value }) => (
            <Tab
              className={`${
                textColor ?? 'text-offWhite'
              } font-bold text-[10px] sm:text-[16px] h-5 sm:h-7`}
              key={value}
              value={value}
            >
              <Link
                locale={value}
                href="/"
                className="flex items-center justify-center gap-2"
              >
                {label.toUpperCase()}
              </Link>
            </Tab>
          ))}
        </TabsHeader>
      </Tabs>
    )

  return (
    <div className="flex gap-10 justify-center items-center">
      {options.map((option, index) => (
        <Link
          href="/"
          locale={option.value}
          className={`transition ease-in-out border-[1px] w-10 h-10 rounded-md flex items-center justify-center hover:bg-gray-500/[0.5] ${
            option.value === locale ? 'bg-gradient-to-r from-[#0ba360] to-[#3cba92]' : null
          }`}
          key={`${option.label}-${index}`}
        >
          {option.label.toUpperCase()}
        </Link>
      ))}
    </div>
  )
}
