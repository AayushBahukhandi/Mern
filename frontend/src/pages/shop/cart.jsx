import React, { useEffect, useState } from "react";
import "./cart.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [editingItemId, setEditingItemId] = useState(null);
  const [updatedQuantity, setUpdatedQuantity] = useState(0);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}shop/getCart`, {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token",),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched cart data:", data);
        if (Array.isArray(data)) {
          setCartItems(data);
          calculateTotalPrice(data);
        } else {
          setCartItems([]);
          throw new Error("Invalid cart data");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const calculateTotalPrice = (items) => {
    const validItems = items.filter(
      (item) =>
        item.productId && item.productId !== null && item.quantity > 0
    );

    const totalPrice = validItems.reduce((acc, item) => {
      const price = item.productId.price || 0;
      const quantity = item.quantity || 0;
      return acc + price * quantity;
    }, 0);

    setCartItems(validItems);
    setTotalPrice(totalPrice);
  };

  const handleDeleteItem = (cartId, productId) => {
    const updatedCartItems = cartItems.filter((item) => item._id !== cartId);
    setCartItems(updatedCartItems);
    calculateTotalPrice(updatedCartItems);

    fetch(`${process.env.REACT_APP_BACKEND_URL}shop/deleteCartItem/${cartId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ productId }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete cart item");
        }
        navigate("/shop");
        navigate("/shop/getCart");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleEditQuantity = (itemId, currentQuantity) => {
    setEditingItemId(itemId);
    setUpdatedQuantity(currentQuantity);
  };

  const handleUpdateQuantity = (itemId) => {
    if (updatedQuantity === 0) {
      handleDeleteItem(itemId, null);
      return;
    }

    const updatedItem = {
      id: itemId,
      quantity: updatedQuantity
    };

    setIsLoading(true);

    fetch(`${process.env.REACT_APP_BACKEND_URL}shop/updateCartItemQuantity/${itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(updatedItem)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update cart item quantity");
        }
        return response.json();
      })
      .then((updatedCartItems) => {
        setCartItems(updatedCartItems);
        calculateTotalPrice(updatedCartItems);
        setEditingItemId(null);
        setUpdatedQuantity(0);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setIsLoading(false);
        navigate("/shop");
        navigate("/shop/getCart");
      });
  };

  const handleProceedToBuy = () => {
    navigate("/thankyou");
  };

  return (
    <div>
      <h2>Cart</h2>
      {isLoading ? (
        <p>Login to Proceed</p>
      ) : (
        <div className="cart-items">
          {Array.isArray(cartItems) && cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div className="cart-item" key={item._id}>
                {item.productId ? (
                  <>
                    <p className="cart-item-name">{item.productId.name}</p>
                    <p className="cart-item-price">₹{item.productId.price}</p>
                    <p className="cart-item-quantity">
                      Quantity:{" "}
                      {item._id === editingItemId ? (
                        <input
                          type="number"
                          value={updatedQuantity}
                          onChange={(e) =>
                            setUpdatedQuantity(parseInt(e.target.value))
                          }
                        />
                      ) : (
                        item.quantity
                      )}
                    </p>
                    <img
                      className="cart-item-image"
                      src={`${process.env.REACT_APP_BACKEND_URL}${item.productId.image}`}
                      alt={item.productId.name}
                    />
                    {item._id === editingItemId ? (
                      <button
                        className="update-button"
                        onClick={() => handleUpdateQuantity(item._id)}
                      >
                        Update
                      </button>
                    ) : (
                      <button
                        className="edit-button"
                        onClick={() =>
                          handleEditQuantity(item._id, item.quantity)
                        }
                      >
                        Edit
                      </button>
                    )}
                    <button
                      className="delete-button"
                      onClick={() =>
                        handleDeleteItem(item._id, item.productId._id)
                      }
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <p className="cart-item-name">Product Not Found</p>
                )}
              </div>
            ))
          ) : (
            <p>No items in the cart.</p>
          )}
          <div className="cart-summary">
            <p className="total-price">Total Price: ₹{totalPrice}</p>
            <button
              className="proceed-to-buy-button"
              onClick={handleProceedToBuy}
            >
              Order to proceed
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
