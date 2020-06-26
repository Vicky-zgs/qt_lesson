import Link from 'next/link'

export default ({ children }) => (
  <header>
    <Link href='/a?id=1' as='/a/1'>
      <Button>Index</Button>
    </Link>
  </header>
)