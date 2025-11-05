import { useEffect, useState } from "react";
import ClientSidebar from "../../Layout/ClientSidebar/ClientSidebar";
import styles from "./ClientPage.module.css";
import { Plus, Upload, Filter, Edit3, Trash2 } from "lucide-react";
import ClientForm from "../../components/ClientForm/ClientForm";

// estado para controlar formulário do modal de um novo cliente
  const EMPTY_CLIENT = {
    nome: "",
    telefone: "",
    email: "",
    veiculo: "",
    servico: "",
    valor: "",
  };

export default function ClientPage () {

   const [isModalOpen, setIsModalOpen] = useState(false);
   const [clients, setClients] = useState([
    { id: 1, nome: "João Silva", telefone: "(11) 99999-9999", email: "joao@email.com", veiculo: "Fiat Uno", servico: "Assoalho", valor: "R$ 600,00" },
    { id: 2, nome: "Maria Souza", telefone: "(11) 98888-8888", email: "maria@email.com", veiculo: "Honda Civic", servico: "Reforma de bancos", valor: "R$ 1.440,00" },
    { id: 3, nome: "Carlos Lima", telefone: "(11) 97777-7777", email: "carlos@email.com", veiculo: "VW Gol", servico: "Portas", valor: "R$ 400,00" },
     { id: 4, nome: "João Silva", telefone: "(11) 99999-9999", email: "joao@email.com", veiculo: "Fiat Uno", servico: "Assoalho", valor: "R$ 600,00" },
    { id: 5, nome: "Maria Souza", telefone: "(11) 98888-8888", email: "maria@email.com", veiculo: "Honda Civic", servico: "Reforma de bancos", valor: "R$ 1.440,00" },
    { id: 6, nome: "Carlos Lima", telefone: "(11) 97777-7777", email: "carlos@email.com", veiculo: "VW Gol", servico: "Portas", valor: "R$ 400,00" },
    { id: 1, nome: "João Silva", telefone: "(11) 99999-9999", email: "joao@email.com", veiculo: "Fiat Uno", servico: "Assoalho", valor: "R$ 600,00" },
    { id: 2, nome: "Maria Souza", telefone: "(11) 98888-8888", email: "maria@email.com", veiculo: "Honda Civic", servico: "Reforma de bancos", valor: "R$ 1.440,00" },
    { id: 3, nome: "Carlos Lima", telefone: "(11) 97777-7777", email: "carlos@email.com", veiculo: "VW Gol", servico: "Portas", valor: "R$ 400,00" },
     { id: 4, nome: "João Silva", telefone: "(11) 99999-9999", email: "joao@email.com", veiculo: "Fiat Uno", servico: "Assoalho", valor: "R$ 600,00" },
    { id: 5, nome: "Maria Souza", telefone: "(11) 98888-8888", email: "maria@email.com", veiculo: "Honda Civic", servico: "Reforma de bancos", valor: "R$ 1.440,00" },
    { id: 6, nome: "Carlos Lima", telefone: "(11) 97777-7777", email: "carlos@email.com", veiculo: "VW Gol", servico: "Portas", valor: "R$ 400,00" },
  ]);

   // --- 1. Estados Gerais ---
  // MOVIDO PARA CIMA: Agora 'search' está definido antes de 'filteredClients'
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 7;

  // Estados para Edição/Adição
  const [editingClientData, setEditingClientData] = useState(EMPTY_CLIENT);
  const [editingClientId, setEditingClientId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // --- 2. LÓGICA DE FILTRO ---
  // AGORA FUNCIONA: 'search' está acessível!
  const filteredClients = clients.filter(c =>
    c.nome.toLowerCase().includes(search.toLowerCase()) ||
    c.veiculo.toLowerCase().includes(search.toLowerCase())
  );

  // --- 3. cálculo de índices de Paginação ---
  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);

  // --- 4. Função de paginação ---
  const totalPages = Math.ceil(filteredClients.length / clientsPerPage);
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Função que será passada para o ClientForm para salvar/atualizar
  const handleSaveClient = (clientData) => {
      if (editingClientId) {
          // Lógica para EDIÇÃO (Atualizar)
          setClients(prev => prev.map(c =>
              c.id === editingClientId ? { ...c, ...clientData } : c
          ));
      } else {
          // Lógica para ADIÇÃO (Novo)
        const newId = clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 1;
        setClients(prev => [...prev, { id: newId, ...clientData }]);
      }

      // Fecha e reseta o estado do formulário
      setIsModalOpen(false);
      setIsEditing(false);
      setEditingClientId(null);
      setEditingClientData(EMPTY_CLIENT);
  };
  const handleCloseModal = () => {
      setIsModalOpen(false);
      setIsEditing(false);
      setEditingClientId(null);
      setEditingClientData(EMPTY_CLIENT);
  }
  const handleEdit = (client) => {
      setEditingClientData(client);
      setEditingClientId(client.id);
      setIsEditing(true);
      setIsModalOpen(true);
  }
  const handleDelete = (clientId) => {
      const confirmed = window.confirm("Tem certeza que deseja excluir este cliente?");
      if (confirmed) {
          setClients(prev => prev.filter(c => c.id !== clientId));
      }
  }

    // Adicione este bloco para controlar o fundo do body
    useEffect(() => {
        // Liga o fundo escuro do body quando esta página é carregada
        document.body.classList.add('bg-dark-client');

        // Desliga o fundo escuro do body quando esta página é desmontada
        return () => {
            document.body.classList.remove('bg-dark-client');
        };
    }, []);

  return (
    <div className={styles.container}>
      <ClientSidebar open={sidebarIsOpen} setOpen={setSidebarIsOpen} />
    {/* conteúdo principal */}
      <main
      className={`${styles.mainContent} ${
        sidebarIsOpen ? styles.sidebarOpen : styles.sidebarClosed
        }`}
      >
        <header className={styles.header}>
          <h1>Clientes</h1>
          <div className={styles.actions}>
            <div className={styles.buttonGroup}>
              <button
                className={styles.btnPrimary}
                onClick={() => {
                  setEditingClientData(EMPTY_CLIENT);
                  setIsEditing(false);
                  setIsModalOpen(true);
                }}
              >
                <Plus size={16} /> Adicionar
              </button>

              <button className={styles.btnSecondary}>
                <Upload size={16} /> Upload
              </button>

              <button className={styles.btnSecondary}>
                <Filter size={16} /> Filtro
              </button>
            </div>
            <input
              type="text"
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </header>
           <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Telefone</th>
              <th>Email</th>
              <th>Veículo</th>
              <th>Serviço</th>
              <th>Valor</th>
              <th>Ações</th>
            </tr>
          </thead>
           <tbody className={styles.itens}>
            {currentClients.map((c) => (
              <tr key={c.id}>
                <td>{c.nome}</td>
                <td>{c.telefone}</td>
                <td>{c.email}</td>
                <td>{c.veiculo}</td>
                <td>{c.servico}</td>
                <td>{c.valor}</td>
                <td className={styles.actionsCell}>
                  <button className={styles.editBtn} onClick={() => handleEdit(c)} title="Editar"><Edit3 size={18} /></button>
                  <button className={styles.deleteBtn} onClick={() => handleDelete(c.id)} title="Excluir"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}

            {filteredClients.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "1rem" }}>
                  Nenhum cliente encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className={styles.pagination}>
          <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
           className={styles.pageBtn}
          >
            Anterior
            </button>
          <span>Página {currentPage} de {totalPages}</span>
          <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={styles.pageBtn}
          >
            Próximo
          </button>
        </div>

        {/* RENDERIZAÇÃO CONDICIONAL DO FORMULÁRIO/MODAL */}
      {isModalOpen && (
        <ClientForm
            client={isEditing ? editingClientData : null}
            onClose={handleCloseModal}
            onSave={handleSaveClient}
        />
      )}
      </main>
      </div>
  )
}