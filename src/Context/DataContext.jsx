import React, { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [venders, setVenders] = useState([]);
  const [Venderadddata, setvenderadddata] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch vender products separately (can be called anytime to refresh)
  const fetchVenderProducts = async () => {
    try {
      const response = await fetch("http://localhost:5179/products");
      const data = await response.json();
      setvenderadddata(data);
    } catch (error) {
      console.error("Failed to fetch vender products:", error);
    }
  };

  // Fetch all initial data
  const fetchData = async () => {
    try {
      const userResponse = await fetch("http://localhost:5177/users");
      const venderResponse = await fetch("http://localhost:5178/vender");
      const usersData = await userResponse.json();
      const vendersData = await venderResponse.json();

      setUsers(usersData);
      setVenders(vendersData);

      // Fetch vender products separately
      await fetchVenderProducts();

      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:5177/users/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchVenderProducts;
  }, []);

  const deleteVender = async (id) => {
    try {
      const response = await fetch(`http://localhost:5178/vender/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setVenders((prevVenders) =>
          prevVenders.filter((vender) => vender.id !== id)
        );
      } else {
        console.error("Failed to delete vender");
      }
    } catch (error) {
      console.error("Error deleting vender:", error);
    }
  };

  const deleteVenderproduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:5179/products/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setvenderadddata((prevData) =>
          prevData.filter((product) => product.id !== id)
        );
      } else {
        console.error("Failed to delete vender product");
      }
    } catch (error) {
      console.error("Error deleting vender product:", error);
    }
  };

  const updateVenderProduct = async (id, updatedProduct) => {
    try {
      const response = await fetch(`http://localhost:5179/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        const updated = await response.json();
        setvenderadddata((prev) =>
          prev.map((p) => (p.id === id ? updated : p))
        );
      } else {
        console.error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const acceptVenderProduct = async (product) => {
    try {
      const response = await fetch("http://localhost:5180/acceptedproducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        console.log("Product accepted and stored in accepted DB");
        await deleteVenderproduct(product.id);
      } else {
        console.error("Failed to accept product");
      }
    } catch (error) {
      console.error("Error accepting product:", error);
    }
  };

  const handleDeleteApprovedproduct = (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this product?");
  if (!confirmDelete) return;

  fetch(`http://localhost:5180/acceptedproducts/${id}`, {
    method: 'DELETE',
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to delete");
      }
      // Update local state
      setProducts(products.filter((product) => product.id !== id));
    })
    .catch((err) => console.error('Delete error:', err));
};


  return (
    <DataContext.Provider
      value={{
        users,
        venders,
        loading,
        deleteUser,
        deleteVender,
        Venderadddata,
        deleteVenderproduct,
        fetchVenderProducts,
        updateVenderProduct,
        acceptVenderProduct,
        handleDeleteApprovedproduct
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
