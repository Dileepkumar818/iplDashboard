// Write your code here
import './index.css'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {Component} from 'react'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

class TeamMatches extends Component {
  state = {
    isLoading: true,
    latestMatchesList: [],
  }

  componentDidMount() {
    this.getTeamMatchesList()
  }

  getTeamMatchesList = async () => {
    console.log(this.props)
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const fetchedMatchesData = await response.json()

    const extractData = {
      teamBannerUrl: fetchedMatchesData.team_banner_url,
      latestMatchDetails: fetchedMatchesData.latest_match_details,
      recentMatches: fetchedMatchesData.recent_matches,
    }

    const {latestMatchDetails} = extractData

    const matchDetails = {
      competingTeam: latestMatchDetails.competing_team,
      firstInnings: latestMatchDetails.first_innings,
      secondInnings: latestMatchDetails.second_innings,
      date: latestMatchDetails.date,
      venue: latestMatchDetails.venue,
      umpires: latestMatchDetails.umpires,
      manOfTheMatch: latestMatchDetails.man_of_the_match,
      result: latestMatchDetails.result,
      competingTeamLogo: latestMatchDetails.competing_team_logo,
      id: latestMatchDetails.id,
    }

    const {recentMatches} = extractData

    const recentMatchDetails = recentMatches.map(each => ({
      competingTeam: each.competing_team,
      competingTeamLogo: each.competing_team_logo,
      venue: each.venue,
      date: each.date,
      id: each.id,
      umpires: each.umpires,
      result: each.result,
      matchStatus: each.match_status,
      firstInnings: each.first_innings,
      secondInnings: each.second_innings,
      manOfTheMatch: each.man_of_the_match,
    }))

    extractData.latestMatchDetails = matchDetails
    extractData.recentMatches = recentMatchDetails

    this.setState({latestMatchesList: extractData, isLoading: false})
  }

  renderTeamMatches = () => {
    const {latestMatchesList} = this.state
    const {teamBannerUrl, latestMatchDetails} = latestMatchesList
    return (
      <div className="team-matches-container">
        <img src={teamBannerUrl} alt="img" className="team-banner" />
        <LatestMatch latestMatch={latestMatchDetails} />
        {this.renderRecentMatchesList()}
      </div>
    )
  }

  renderRecentMatchesList = () => {
    const {latestMatchesList} = this.state
    const {recentMatches} = latestMatchesList
    return (
      <ul className="recent-matches-list">
        {recentMatches.map(eachMatch => (
          <MatchCard matchData={eachMatch} key={eachMatch.id} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader
        type="BallTriangle"
        color="#00BFFF"
        height={80}
        width={80}
        data-testid="loader"
      />
    </div>
  )

  render() {
    const {isLoading} = this.state
    const {match} = this.props
    const {params} = match
    const {id} = params
    return (
      <div className={`app-team-matches-container ${id}`}>
        {isLoading ? this.renderLoader() : this.renderTeamMatches()}
      </div>
    )
  }
}

export default TeamMatches
