// Write your code here
import {Link} from 'react-router-dom'

import './index.css'

const TeamCard = props => {
  const {teamsList} = props
  const {name, teamImageUrl} = teamsList

  return (
    <div>
      <Link to="/teams-match/:id">
        <div>
          <img src={teamImageUrl} alt={name} className="teamLogo" />
        </div>
      </Link>
    </div>
  )
}

export default TeamCard
