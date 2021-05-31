import { NavBar } from '@ui/NavBar'

export function Header() {
  return (
    <div className="mx-auto" style={{ maxWidth: '98%' }}>
      <NavBar title="🌿 Plantpedia">
        <div>{/* NavLink items */}</div>
      </NavBar>
    </div>
  )
}
