import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../../Context/DataContext";
import Carousel from "../../../Components/Carousel";
import { Typography } from "@mui/material";
import CategoryBar from "../../../Components/CategoryBar";

function Home() {
  const Navigate=useNavigate()
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isReadMore, setIsReadMore] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedData, setEditedData] = useState({ title: "", description: "" });


  useEffect(() => {
    fetch("http://localhost:5180/acceptedproducts")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        const readMoreState = {};
        data.forEach((p) => (readMoreState[p.id] = false));
        setIsReadMore(readMoreState);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const toggleReadMore = (id) => {
    setIsReadMore((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handlenave =()=>{
      Navigate('/user/cart')
  }

  const handleModify = (product) => {
    setSelectedProduct(product);
    setEditedData({ title: product.title, description: product.description });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const updated = products.map((p) =>
      p.id === selectedProduct.id
        ? { ...p, title: editedData.title, description: editedData.description }
        : p
    );
    setProducts(updated);
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div>
      <Typography textAlign={"center"} variant="h3" > </Typography>
      <CategoryBar/>
      <Carousel/>

      <div style={styles.gridContainer}>
        {products.map((product) => (
          <div key={product.id} style={styles.card}>
            <img src={product.image} alt={product.title} style={styles.image} />
            <h3>{product.title}</h3>
            <p>
              <strong>${product.price}</strong>
            </p>
            <div style={styles.desc}>
              <span>
                {isReadMore[product.id]
                  ? product.description
                  : product.description.slice(0, 100) + "..."}
              </span>
              <button
                onClick={() => toggleReadMore(product.id)}
                style={styles.readMoreBtn}
              >
                {isReadMore[product.id] ? "Read Less" : "Read More"}
              </button>
            </div>
            <div style={styles.buttonGroup}>
              <button onClick={handlenave} style={styles.modifyBtn}>
                Add to cart
              </button>
              <button onClick={() => {}} style={styles.deleteBtn}>
                View More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Modify Product</h3>
            <input
              type="text"
              value={editedData.title}
              onChange={(e) =>
                setEditedData({ ...editedData, title: e.target.value })
              }
              style={styles.input}
              placeholder="Title"
            />
            <textarea
              rows="5"
              value={editedData.description}
              onChange={(e) =>
                setEditedData({ ...editedData, description: e.target.value })
              }
              style={styles.textarea}
              placeholder="Description"
            ></textarea>
            <div style={{ marginTop: "10px", textAlign: "right" }}>
              <button onClick={handleSave} style={styles.saveBtn}>
                Save
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                style={styles.cancelBtn}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    padding: "20px",
    alignItems: "stretch",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "15px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    textAlign: "center",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "contain",
  },
  desc: {
    fontSize: "13px",
    color: "#666",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  readMoreBtn: {
    backgroundColor: "transparent",
    border: "none",
    color: "#007bff",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "bold",
    textDecoration: "underline",
    transition: "color 0.3s",
    padding: 0,
    marginTop: "5px",
  },
  modifyBtn: {
    padding: "8px 14px",
    border: "none",
    backgroundColor: "#17a2b8",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
  deleteBtn: {
    padding: "8px 14px",
    border: "none",
    backgroundColor: "#dc3545",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
  buttonGroup: {
    marginTop: "auto",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "90%",
    maxWidth: "400px",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
  },
  textarea: {
    width: "100%",
    padding: "8px",
  },
  saveBtn: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    marginRight: "10px",
  },
  cancelBtn: {
    padding: "10px 20px",
    backgroundColor: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Home;
