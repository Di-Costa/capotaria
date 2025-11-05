import  { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import styles from './ClientForm.module.css';

// --- 1. Dados Fixos dos Serviços ---
const FIXED_SERVICES = [
    { name: "Reforma de bancos", price: 1400.00, id: 'reforma_bancos' },
    { name: "Portas", price: 400.00, id: 'portas' },
    { name: "Teto", price: 500.00, id: 'teto' },
    { name: "Assoalho", price: 600.00, id: 'assoalho' },
    { name: "Lavagem de bancos", price: 300.00, id: 'lavagem_bancos' },
    { name: "Outros", price: 0, id: 'outros' },
];

// --- 2. Correção: INITIAL_FORM_DATA ---
const INITIAL_FORM_DATA = {
    nome: "",
    telefone: "",
    email: "",
    veiculo: "",
    // CORREÇÃO: Remova 'servico' (singular)
    servicos: [], // NOVO: Campo para guardar IDs dos serviços selecionados (Array)
    valor: "0.00" // Inicializa como string formatada para 0.00
};

export default function ClientForm({ client, onClose, onSave }) {
    // Inicializa com os dados iniciais.
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);

    // --- Funções Auxiliares (mantidas) ---
    const getServicePrice = (id) => {
        return FIXED_SERVICES.find(s => s.id === id)?.price || 0;
    };

    // --- 3. Atualização no useEffect para Edição ---
    useEffect(() => {
        if (client) {
            // Se estiver em modo Edição, garante que 'servicos' é um array,
            // e recalcula o valor para garantir a formatação correta.
            const initialServicos = client.servicos || [];

            const initialTotal = initialServicos.reduce((total, id) => {
                return total + getServicePrice(id);
            }, 0);

            setFormData({
                ...client,
                servicos: initialServicos,
                valor: initialTotal.toFixed(2)
            });
        } else {
            // Modo Novo Cliente
            setFormData(INITIAL_FORM_DATA);
        }
    }, [client]);


    // --- 4. Handler para Checkboxes (Multi-Serviços) (mantido) ---
    const handleServiceChange = (e) => {
        const { value, checked } = e.target;

        // 1. Atualiza o array de serviços
        const newServices = checked
            ? [...formData.servicos, value]
            : formData.servicos.filter(serviceId => serviceId !== value);

        // 2. Calcula o novo valor total
        const newTotal = newServices.reduce((total, id) => {
            return total + getServicePrice(id);
        }, 0);

        // 3. Atualiza o estado
        setFormData(prev => ({
            ...prev,
            servicos: newServices,
            valor: newTotal.toFixed(2)
        }));
    };

    // --- 5. Handler genérico para os outros inputs (mantido) ---
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // --- 6. handleSubmit (mantido) ---
    function handleSubmit(e) {
        e.preventDefault();
        onSave(formData);
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h3>{client ? "Editar Cliente" : "Novo Cliente"}</h3>

                <button className={styles.closeButton} onClick={onClose}>
                    <X size={24} />
                </button>
                <form onSubmit={handleSubmit} className={styles.form}>
                    {/* Campos de Texto */}
                    {/* ... (nome, telefone, email, veiculo - Use o handleChange) ... */}

                    <input type="text" name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} required />
                    <input type="text" name="telefone" placeholder="Telefone" value={formData.telefone} onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    <input type="text" name="veiculo" placeholder="Veículo" value={formData.veiculo} onChange={handleChange} required />

                    {/* CORREÇÃO: Remova o input 'valor' manual aqui. Ele deve vir DEPOIS dos serviços e ser READONLY */}
                    {/* Você tinha dois inputs 'valor'. O primeiro foi removido abaixo */}

                    {/* --- Seção de Serviços (com Checkboxes) --- */}
                    <div className={styles.formGroup}>
                        <label>Serviços Selecionados:</label>
                        {FIXED_SERVICES.map((service) => (
                            <label key={service.id} className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    name="servicos"
                                    value={service.id}
                                    checked={formData.servicos.includes(service.id)}
                                    onChange={handleServiceChange}
                                />
                                {service.name} (R$ {service.price.toFixed(2).replace('.', ',')})
                            </label>
                        ))}
                    </div>

                    {/* --- Campo de Valor Total (Calculado e ReadOnly) --- */}
                    <input
                        type="text"
                        name="valor" // O nome é mantido para que o valor seja incluído no formData
                        placeholder="Valor Total"
                        // Formata o valor para exibição
                        value={`R$ ${String(formData.valor).replace('.', ',')}`}
                        readOnly // ESSENCIAL: Impede edição manual
                        required
                    />

                    <div className={styles.actions}>
                        <button type="submit" className={styles.submitBtn}>
                            {client ? "Atualizar" : "Salvar"}
                        </button>
                        <button type="button" className={styles.cancelBtn} onClick={onClose}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}