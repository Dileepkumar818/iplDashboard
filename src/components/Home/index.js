// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {teamsList: [], isLoading: true}

  componentDidMount() {
    this.getIplTeams()
    console.log('hgshcg')
  }

  getIplTeams = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const fetchedData = await response.json()

    this.setState({
      isLoading: false,
      teamsList: fetchedData.map(eachTeam => ({
        name: eachTeam.name,
        id: eachTeam.id,
        teamImageUrl: eachTeam.team_image_url,
      })),
    })
  }

  renderIplTeams = () => {
    const {teamsList} = this.state
    return <TeamCard teamsList={teamsList} />
  }

  loading = () => (
    <div data-testid="loader">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    console.log(isLoading)

    return (
      <div className="home-container">
        {isLoading ? this.loading() : this.renderIplTeams()}
      </div>
    )
  }
}

export default Home
