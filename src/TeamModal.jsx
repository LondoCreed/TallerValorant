import React from 'react';

const TeamModal = ({ team, removeFromTeam, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-purple-500 p-6 rounded-lg shadow-lg w-full max-w-lg">
      <h3 className="text-2xl font-bold mb-4">Equipo Seleccionado</h3>
      {team.length === 0 ? (
        <p>No tenemos agentes enlistados!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {team.map(agent => (
            <div key={agent.uuid} className="border p-2 text-center rounded-lg">
              <h4 className="font-semibold">{agent.displayName}</h4>
              <img src={agent.displayIcon} alt={agent.displayName} className="w-16 h-16 mx-auto" />
              <button 
                onClick={() => removeFromTeam(agent)} 
                className="mt-2 text-red-800">
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
      <button onClick={onClose} className="mt-4 bg-purple-800 px-4 py-2 rounded">
        Cerrar
      </button>
    </div>
  </div>
);

export default TeamModal;
