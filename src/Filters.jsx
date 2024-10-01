const Filters = ({ setSearchText, setSelectedRole }) => (
  <div className="mb-4 flex flex-col md:flex-row justify-end">
    <input
      type="text"
      placeholder="Buscar agente"
      onChange={(e) => setSearchText(e.target.value)}
      className="border p-2 mr-2 bg-purple-600 rounded mb-2 md:mb-0"
    />
    <select onChange={(e) => setSelectedRole(e.target.value)} className="border p-2 bg-purple-600 rounded">
      <option value="">Todos los Roles</option>
      <option value="Duelist">Duelista</option>
      <option value="Controller">Controlador</option>
      <option value="Initiator">Iniciador</option>
      <option value="Sentinel">Centinela</option>
    </select>
  </div>
);

export default Filters;
 