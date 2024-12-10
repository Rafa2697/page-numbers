
import { useEffect, useState } from "react";

interface DataItem {
  _id: string;
  number: string;
  active: boolean;
  local: string;
  image: string;
  createdAt: string;
}

export default function NumberManager() {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<Omit<DataItem, "_id" | "createdAt">>({
    number: "",
    active: false,
    local: "",
    image: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  // Fetch data from the API
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api-numbers-unisepe.onrender.com/numbers"); // Atualize o endpoint conforme necessário
      const result: DataItem[] = await response.json();
      setData(result);
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    }
    setLoading(false);
  };

  // Atualizar lista ao carregar o componente
  useEffect(() => {
    fetchData();
  }, []);

  // Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Adicionar ou editar dados
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Atualizar registro existente
        await fetch(`https://api-numbers-unisepe.onrender.com/numbers/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        // Criar novo registro
        await fetch("https://api-numbers-unisepe.onrender.com/numbers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }
      setFormData({ number: "", active: false, local: "", image: "" });
      setEditingId(null);
      fetchData();
    } catch (error) {
      console.error("Erro ao salvar os dados:", error);
    }
  };

  // Excluir registro
  const handleDelete = async (id: string) => {
    try {
      await fetch(`https://api-numbers-unisepe.onrender.com/numbers/${id}`, { method: "DELETE" });
      fetchData();
    } catch (error) {
      console.error("Erro ao excluir o dado:", error);
    }
  };

  // Preencher formulário para edição
  const handleEdit = (item: DataItem) => {
    setFormData({
      number: item.number,
      active: item.active,
      local: item.local,
      image: item.image,
    });
    setEditingId(item._id);
  };

  return (
    <div className=" mx-auto p-6 bg-white border shadow-md rounded-lg overflow-y-scroll md:overflow-hidden md:h-full">
      <h1 className="text-xl font-bold mb-4">Gerenciador de Números</h1>

      <div className="flex flex-col md:flex-row gap-4 ">
          {/* Formulário */}
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
              <div>
                <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                  Número
                </label>
                <input
                  type="text"
                  id="number"
                  name="number"
                  value={formData.number}
                  onChange={handleInputChange}
                  className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="local" className="block text-sm font-medium text-gray-700">
                  Local
                </label>
                <input
                  type="text"
                  id="local"
                  name="local"
                  value={formData.local}
                  onChange={handleInputChange}
                  className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                  URL da Imagem
                </label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="active"
                  name="active"
                  checked={formData.active}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="active" className="text-sm font-medium text-gray-700">
                  Ativo
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md" 
            >
              {editingId ? "Atualizar" : "Cadastrar"}
            </button>
          </form>
          {/* Lista de Números */}
          {loading ? (
            <p>Carregando...</p>
          ) : (
            
                <ul className="space-y-4  overflow-y-scroll h-[250px]">
                  {data.map((item) => (
                    <li
                      key={item._id}
                      className="flex items-center justify-between p-4 border border-teal-950 rounded-md"
                    >
                      <div>
                        <p className="text-lg font-medium">{item.number}</p>
                        <p className="text-sm text-gray-500">{item.local}</p>
                        <p className={`text-sm ${item.active ? "text-green-600" : "text-red-600"}`}>
                          {item.active ? "Ativo" : "Inativo"}
                        </p>
                      </div>
                      <div className="flex gap-4">
                        <button
                          onClick={() => handleEdit(item)}
                          className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded-md"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
                        >
                          Excluir
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
      
          )}
      </div>
    </div>
  );
}
