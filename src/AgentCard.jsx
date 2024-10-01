const AgentCard = ({ agent, addToTeam, removeFromTeam, team }) => {
  const isInTeam = team.some((member) => member.uuid === agent.uuid); // Verifica si el agente está en el equipo
  return (
    <div className="border p-4 rounded-lg shadow-lg bg-purple-400 hover:bg-purple-500 transition-transform transform hover:scale-95">
  <h2 className="text-xl font-bold text-center">{agent.displayName}</h2>
  <div className="relative pt-[100%] "> 
    <img
      src={agent.fullPortrait || agent.bustPortrait || agent.displayIcon}
      alt={agent.displayName}
      className="absolute top-0 left-0 w-full h-full object-cover object-top"
    />
  </div>
  <p className="text-center">{agent.role?.displayName}</p>
  <div className="flex justify-center mt-2"> {/* Contenedor flex para centrar el botón */}
        {isInTeam ? (
          <button 
            onClick={() => removeFromTeam(agent)} 
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Eliminar del equipo
          </button>
        ) : (
          <button 
            onClick={() => addToTeam(agent)} 
            className="bg-purple-800 text-white px-4 py-2 rounded"
          >
            Agregar al equipo
          </button>
        )}
      </div>
    </div>

  );
};

export default AgentCard;
