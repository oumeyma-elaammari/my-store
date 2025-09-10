import { useState, useEffect } from "react";
import "./dashboard.css";

function Products() {
  const [platziProducts, setPlatziProducts] = useState([]);
  const [customProducts, setCustomProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: ""
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const token = sessionStorage.getItem("access_token");

  // URL de base configurable
  const API_BASE_URL = "http://localhost:8000/api";

  const fetchPlatziProducts = async () => {
    try {
      const res = await fetch("https://api.escuelajs.co/api/v1/products?limit=10");
      const data = await res.json();
      setPlatziProducts(data);
    } catch (err) {
      console.error("Error fetching Platzi products:", err);
    }
  };

 const fetchCustomProducts = async () => {
  try {
    const token = localStorage.getItem('token'); 

    const response = await fetch('http://localhost:8000/api/products', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include', 
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

 const handleAddProduct = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError(null);

  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json"
      },
      body: JSON.stringify({
        title: newProduct.title,
        price: parseFloat(newProduct.price),
        description: newProduct.description || null,
        category: newProduct.category || null,
        image: newProduct.image || null
      })
    });

    // Vérification du content-type
    const contentType = response.headers.get("content-type");
    
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      console.error("Réponse non-JSON:", text);
      throw new Error("Le serveur a renvoyé une réponse inattendue");
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Erreur lors de l'ajout du produit");
    }

    // Réinitialisation du formulaire
    setNewProduct({ title: "", price: "", description: "", category: "", image: "" });
    await fetchCustomProducts();
    
  } catch (err) {
    console.error("Erreur complète:", err);
    setError(err.message.includes("Unexpected token") 
      ? "Erreur de communication avec le serveur" 
      : err.message);
  } finally {
    setIsLoading(false);
  }
};

 const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce produit ?")) return;
    await fetch(`http://localhost:8000/api/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchCustomProducts();
  };
  useEffect(() => {
    fetchPlatziProducts();
    fetchCustomProducts();
  }, []);




  return (
    <div className="dashboard-content">
      <h2 className="dashboard-title">Gestion des Produits</h2>

      <div className="products-section">
        <div className="product-list">
          <h3>Produits Platzi</h3>
          <ul>
            {platziProducts.map((p) => (
              <li key={p.id}>
                {p.title} - {p.price} MAD
              </li>
            ))}
          </ul>
        </div>

        <div className="product-custom">
          {error && <p className="error">{error}</p>}

          <h3 style={{ marginTop: "25px" }}>Vos produits personnalisés</h3>
          <ul>
            {customProducts.map((p) => (
              <li key={p.id}>
                {p.title} - {p.price} MAD
                <button className="delete-btn" onClick={() => handleDelete(p.id)}>
                  🗑️
                </button>
              </li>
            ))}
          </ul>
            <h3>Ajouter un produit personnalisé</h3>
          <form onSubmit={handleAddProduct} className="product-form">
            <input
              type="text"
              placeholder="Nom"
              value={newProduct.title}
              onChange={(e) =>
                setNewProduct({ ...newProduct, title: e.target.value })
              }
              required
            />
            <input
              type="number"
              placeholder="Prix"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Description (optionnel)"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Catégorie (optionnel)"
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Image URL (optionnel)"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <button type="submit">Ajouter</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Products;
