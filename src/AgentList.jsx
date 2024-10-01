import AgentCard from './AgentCard';

const AgentList = ({ agents, addToTeam, removeFromTeam, team }) => {
  if (agents.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <p className="text-4xl">No se encontraron agentes que coincidan con la búsqueda.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {agents.map(agent => (
        <AgentCard 
          key={agent.uuid} 
          agent={agent} 
          addToTeam={addToTeam} 
          removeFromTeam={removeFromTeam} 
          team={team} 
        />
      ))}
    </div>
  );
};

export default AgentList;
