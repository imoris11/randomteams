import React from 'react';
import './App.css';

function App() {
  const [name, setName] = React.useState("")
  const [numberOfTeams, setNumberOfTeams] = React.useState(0)
  const [users, setUsers] = React.useState({})
  const [teams, setTeams] = React.useState({})
  const [showTeams, setShowTeams] = React.useState(false)

  const handleChange = (e) => {
    setName(e.target.value);
  }

  const handleTeamChange = (e) => {
    setNumberOfTeams(e.target.value);
  }

  const handleAddMember = () => {
    let tempUsers = {...users}
    tempUsers[name] = 1
    setUsers(tempUsers)
    setName("")
  }

  const handleGenerateTeams = () => {
    let tempUsers = Object.keys(users)
    const teamSize = Math.floor((tempUsers.length-1) / numberOfTeams)
    let teams = {}
    for (let i =0; i<numberOfTeams; i++) {
      teams[i] = []
      let currentTeamSize = 0
      while(currentTeamSize <= teamSize) {
        let randomPosition = Math.floor(Math.random() * ((tempUsers.length-1) - 0 + 1) + 0);
         teams[i].push(tempUsers[randomPosition])
         currentTeamSize++
         tempUsers.splice(randomPosition, 1)
      }    }
    setTeams(teams)
    setShowTeams(true)
  }

  return (
    <main>
      <h3>Random 🌚 Team Generator </h3>
      <div className="container">
      <span className="span">Player</span>
      <input type="text" placeholder="Enter name" name="name" value={name} onChange={handleChange} />&nbsp;&nbsp;
      <button onClick={handleAddMember} >Add</button>
      </div>

      <div className="container">
      <span className="span">Team size</span>
      <input type="number" placeholder="Enter size" name="numberOfTeams" value={numberOfTeams} onChange={handleTeamChange} />
      </div>
      <div>
      {Object.keys(users).length > 0 && !showTeams && (
        <>
        <h3>Added Users </h3>
          {Object.keys(users).map((user) => 
            <p>{user} </p>
          )}

          <button className="success-button" onClick={handleGenerateTeams} >Generate Teams </button>
        </>
      ) }

      {Object.keys(teams).length > 0 && showTeams && (
        <>
        <h3>Generated Teams </h3>
          {Object.keys(teams).map((team) => 
          <>
          <p className="title">Team {Number(team)  + 1}</p>
            {teams[team].map((member) => 
              <p>{member}</p>
            )}
          </>
            
          )}

          <button className="success-button" onClick={handleGenerateTeams} >Regenerate Teams </button>
        </>
      ) }
      </div>

    </main>
  );
}

export default App;