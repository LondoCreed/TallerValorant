import { useState, useEffect } from 'react' // importamos stado y usseEffect
import AgentList from './AgentList.jsx' // importamos el componente AgentList
import Filters from './Filters.jsx'  // importamos el componente Filters
import TeamModal from './TeamModal.jsx'  // importamos el componente TeamModal
import Pagination from './Pagination.jsx'  // importamos el componente Pagination
import Header from './Header.jsx'

const App = () => {
  const [agents, setAgents] = useState([]) //Array de agentes
  const [filteredAgents, setFilteredAgents] = useState([]) //Array de agents filtrados
  const [loading, setLoading] = useState(true) //estado que indica si se esta cargando los agentes (en caso de tardar la carga)
  const [searchText, setSearchText] = useState('') //estado que maneja el texto de búsqueda
  const [selectedRole, setSelectedRole] = useState('')  //estado que maneja el rol seleccionado
  const [team, setTeam] = useState(() => { //estado que maneja el almacenamiento del modal en localStorage
    const savedTeam = localStorage.getItem('valorantTeam') 
    return savedTeam ? JSON.parse(savedTeam) : [] 
  })
  const [currentPage, setCurrentPage] = useState(1) //estado que maneja la paginación
  const [showModal, setShowModal] = useState(false) //estado que maneja el toggle del modal
  const [showFullTeamMessage, setShowFullTeamMessage] = useState(false) //estado que maneja el mensaje de alerta cuando el equipo está completo
  const agentsPerPage = 6 // varible para definir cantidad de agentes por página

  useEffect(() => { 
    const fetchAgents = async () => {
      const res = await fetch('https://valorant-api.com/v1/agents?isPlayableCharacter=true')
      const data = await res.json()
      setAgents(data.data)
      setFilteredAgents(data.data)
      setLoading(false)
    }
    fetchAgents()
  }, [])

  useEffect(() => {
    const filtered = agents.filter(agent =>
      agent.displayName.toLowerCase().includes(searchText.toLowerCase()) &&
      (selectedRole ? agent.role?.displayName === selectedRole : true)
    )
    setFilteredAgents(filtered)
  }, [searchText, selectedRole, agents])

  const addToTeam = (agent) => {
    if (team.includes(agent)) {
      alert("Este agente ya está en el equipo.")
      return
    }

    if (team.length < 5) {
      const newTeam = [...team, agent]
      setTeam(newTeam)
      localStorage.setItem('valorantTeam', JSON.stringify(newTeam))
    } else {
      setShowFullTeamMessage(true)
    }
  }

  const removeFromTeam = (agentToRemove) => {
    const newTeam = team.filter(agent => agent.uuid !== agentToRemove.uuid)
    setTeam(newTeam)
    localStorage.setItem('valorantTeam', JSON.stringify(newTeam))
  }

  const indexOfLastAgent = currentPage * agentsPerPage
  const currentAgents = filteredAgents.slice(indexOfLastAgent - agentsPerPage, indexOfLastAgent)

  const handleCloseMessage = () => {
    setShowFullTeamMessage(false)
  }

  if (loading) return <p className='text-center bg-red-700'>Cargando...</p>

  return (
    <div className=" w-full min-h-screen bg-gray-100 p-14 mx-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col">
      <Header/>
      <Filters setSearchText={setSearchText} setSelectedRole={setSelectedRole} />
      <button onClick={() => setShowModal(true)} className="mb-4 bg-purple-800 text-white px-4 py-2 rounded w-fit cnter">Ver Equipo</button>
      <AgentList agents={currentAgents} addToTeam={addToTeam} removeFromTeam={removeFromTeam} team={team} />
      <Pagination totalAgents={filteredAgents.length} agentsPerPage={agentsPerPage} paginate={setCurrentPage} />

      {showFullTeamMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-purple-400 p-5 rounded shadow-lg text-center">
            <h2 className="text-lg font-bold">¡El equipo está completo!</h2>
            <button onClick={handleCloseMessage} className="mt-4 bg-purple-800 text-white px-4 py-2 rounded">
              Cerrar
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <TeamModal team={team} removeFromTeam={removeFromTeam} onClose={() => setShowModal(false)} />
      )}
    </div>
  )
}

export default App