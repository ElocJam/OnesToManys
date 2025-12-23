import { useState, useEffect } from 'react';
import { fetchAllData, fetchItemsByOrderId, createOrder, updateOrder, deleteOrder, createItem, updateItem, deleteItem } from './api.js';
import { formatCurrency } from './utils.js';
import './App.css';

function App() {

  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [currentView, setCurrentView] = useState('landing');
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingItems, setIsLoadingItems] = useState(false);

  const [newOrder, setNewOrder] = useState({
    tableNumber: '',
    serverName: '',
    guestCount: '',
    notes: '',
  });

  const [newItem, setNewItem] = useState({
    orderId: '',
    itemName: '',
    itemQuantity: '',
    itemPrice: '',
    sides: '',
    sidePrice: '',
    modifiers: '',
  });

  const showLandingView = () => {
    setCurrentView('landing');
  };

  const showOrdersView = () => {
    setCurrentView('orders');
  };

  const showAllItemsView = () => {
    setCurrentView('allItems');
  };

  const showAddOrderView = () => {
    setCurrentView('addOrder');
    setNewOrder({
      tableNumber: '',
      serverName: '',
      guestCount: '',
      notes: '',
    });
  };

  const showAddItemView = () => {
    setCurrentView('addItem');
    setNewItem({
      orderId: '',
      itemName: '',
      itemQuantity: '',
      itemPrice: '',
      sides: '',
      sidePrice: '',
      modifiers: '',
    });
  };

  const loadAndShowOrders = async () => {
    try {
      setIsLoading(true);
      const data = await fetchAllData();
      setOrders(data.orders);
      setItems(data.items);
      showOrdersView();
    } catch (error) {
      console.error('Failed to load orders:', error);
      alert('Failed to load orders. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadAndShowAllItems = async () => {
    try {
      setIsLoading(true);
      const data = await fetchAllData();
      setOrders(data.orders);
      setItems(data.items);
      showAllItemsView();
    } catch (error) {
      console.error('Failed to load items', error);
      alert('Failed to load items. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const showOrderItemsView = async (orderId) => {
    setCurrentView('orderItems');
    setSelectedOrderId(orderId);
    const order = orders.find(o => o.orderId === orderId);
    setSelectedOrder(order);

    try {
      setIsLoadingItems(true);
      const items = await fetchItemsByOrderId(orderId);
      setOrderItems(items);
    } catch (error) {
      console.error('Failed to load items:', error);
      alert('Failed to load items.');
    } finally {
      setIsLoadingItems(false);
    }
  };

  const handleAddOrderSubmit = async (e) => {
    e.preventDefault();

    try {
      const orderData = {
        tableNumber: newOrder.tableNumber,
        serverName: newOrder.serverName,
        guestCount: newOrder.guestCount,
        notes: newOrder.notes || null,
        subtotal: 0,
        tax: 0,
        total: 0
      };

    const createdOrder = await createOrder(orderData);
    alert(`Order #${createdOrder.orderId} created successfully!`);
    showLandingView();
    } catch (error) {
    console.error('Failed to create order:', error);
    alert('Failed to create order. Please try again.');
    }
  };

  const handleEditOrder = async (orderId) => {
    const order = orders.find(o => o.orderId === orderId);

    if (!order) {
      alert('Order not found');
      return;
    }

    const newTableNumber = prompt('Enter new table number:', order.tableNumber);
    const newServerName = prompt('Enter new server name:', order.serverName);
    const newGuestCount = prompt('Enter new guest count:', order.guestCount);
    const newNotes = prompt('Enter new notes:', order.notes || '');

    if (newTableNumber === null) return;

    const updatedOrder = {
      ...order,
      tableNumber: newTableNumber,
      serverName: newServerName,
      guestCount: parseInt(newGuestCount),
      notes: newNotes || null
    };

    try {
      await updateOrder(orderId, updatedOrder);
      alert('Order updated successfully!');
      await loadAndShowOrders();
    } catch (error) {
      console.error('Failed to update order:', error);
      alert('Failed to update order.');
    }
  };

  const handleDeleteOrder = async (orderId) => {
    const order = orders.find(o => o.orderId === orderId);

    if (!order) {
      alert('Order not found');
      return;
    }

    const confirmed = confirm(`Are you sure you want to delete Order #${orderId}?`);
    if (!confirmed) return;

    try {
      await deleteOrder(orderId);
      alert('Order deleted successfully!');
      await loadAndShowOrders();
    } catch (error) {
      console.error('Failed to delete order:', error);
      alert('Failed to delete order.');
    }
  };

  const handleEditItem = async (itemId) => {
  const item = items.find(i => i.itemId === itemId);
  
  if (!item) {
    alert('Item not found');
    return;
  }
  
  const newItemName = prompt('Enter new item name:', item.itemName);
  const newQuantity = prompt('Enter new quantity:', item.itemQuantity);
  const newPrice = prompt('Enter new price:', item.itemPrice);
  const newSides = prompt('Enter sides (leave empty for none):', item.sides || '');
  const newSidePrice = prompt('Enter side price (leave empty for none):', item.sidePrice || '');
  const newModifiers = prompt('Enter modifiers (leave empty for none):', item.modifiers || '');
  
  if (newItemName === null) return;
  
  const quantity = parseInt(newQuantity);
  const price = parseFloat(newPrice);
  const sPrice = newSidePrice ? parseFloat(newSidePrice) : 0;

    const itemTotal = (price * quantity) + sPrice;
  
  const updatedItem = {
    ...item,
    itemName: newItemName,
    itemQuantity: quantity,
    itemPrice: price,
    sides: newSides || null,
    sidePrice: newSidePrice ? parseFloat(newSidePrice) : null,
    modifiers: newModifiers || null,
    itemTotal
  };
  
    try {
      await updateItem(itemId, updatedItem);
      alert('Item updated successfully!');
      await loadAndShowAllItems();
    } catch (error) {
      console.error('Failed to update item:', error);
      alert('Failed to update item.');
    }
  };

  const handleDeleteItem = async (itemId) => {
    const item = items.find(i => i.itemId === itemId);
    
    if (!item) {
      alert('Item not found');
      return;
    }
    
    const confirmed = confirm(`Are you sure you want to delete "${item.itemName}"?`);
    if (!confirmed) return;
    
    try {
      await deleteItem(itemId);
      alert('Item deleted successfully!');
      await loadAndShowAllItems();
    } catch (error) {
      console.error('Failed to delete item:', error);
      alert('Failed to delete item.');
    }
  };

  const handleAddItemSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const itemTotal = (newItem.itemPrice * newItem.itemQuantity) + 
          (newItem.sidePrice || 0);
    
    const itemData = {
      orderId: newItem.orderId,
      itemName: newItem.itemName,
      itemQuantity: newItem.itemQuantity,
      itemPrice: newItem.itemPrice,
      sides: newItem.sides || null,
      sidePrice: newItem.sidePrice || null,
      modifiers: newItem.modifiers || null,
      itemTotal
    };
    
    const createdItem = await createItem(itemData);
    alert(`Item "${createdItem.itemName}" added successfully!`);
    showLandingView();
  } catch (error) {
    console.error('Failed to create item:', error);
    alert('Failed to create item. Please try again.');
  }
};

    return (
      <div id="app">
        <header>
          <h1 className="main-title">Nota-POS</h1>
        </header>

      {currentView === 'landing' && (
        <div className="landing-container">
          <div className="action-section">
            <h2>Orders</h2>
            <div className="button-group">
              <button onClick={loadAndShowOrders} className="action-btn">Show All Orders</button>
              <button onClick={showAddOrderView} className="action-btn">Add Order</button>
            </div>
          </div>
          
          <div className="action-section">
            <h2>Items</h2>
            <div className="button-group">
              <button onClick={loadAndShowAllItems} className="action-btn">Show All Items</button>
              <button onClick={showAddItemView} className="action-btn">Add Item</button>
            </div>
          </div>
        </div>
      )}

      {currentView === 'orders' && (
        <div className="container">
          <button onClick={showLandingView} className="back-btn">← Back to Home</button>
          <h2>Orders</h2>
          {isLoading ? (
            <div className="loading-indicator">Loading...</div>
          ) : orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <div>
              {orders.map(order => (
              <div key={order.orderId} className="order-card">
                <h3>Order #{order.orderId}</h3>
                <div className="order-info">
                  <p><strong>Table:</strong> {order.tableNumber}</p>
                  <p><strong>Server:</strong> {order.serverName}</p>
                  <p><strong>Guests:</strong> {order.guestCount}</p>
                  <p><strong>Total:</strong> {formatCurrency(order.total)}</p>
                </div>
                <p><strong>Notes:</strong> {order.notes || 'None'}</p>
                <div className="card-actions">
                  <button 
                    onClick={() => showOrderItemsView(order.orderId)} 
                    className="show-items-btn"
                  >
                    Show Items
                  </button>
                  <button 
                    onClick={() => handleEditOrder(order.orderId)} 
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteOrder(order.orderId)} 
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
              ))}
            </div>
          )}
        </div>
      )}
      {currentView === 'addOrder' && (
        <div className="container">
          <button onClick={showLandingView} className="back-btn">Back to Home</button>
          <h2>Add New Order</h2>
          <form onSubmit={handleAddOrderSubmit} className="form-container">
            <div className="form-group">
              <label htmlFor="tableNumber">Table Number:</label>
              <input
                type="text"
                id="tableNumber"
                value={newOrder.tableNumber}
                onChange={(e) => setNewOrder({...newOrder, tableNumber: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="serverName">Server Name:</label>
              <input
                type="text"
                id="serverName"
                value={newOrder.serverName}
                onChange={(e) => setNewOrder({...newOrder, serverName: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="guestCount">Guest Count:</label>
              <input
                type="number"
                id="guestCount"
                value={newOrder.guestCount}
                onChange={(e) => setNewOrder({...newOrder, guestCount: parseInt(e.target.value)})}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="notes">Notes:</label>
              <textarea
                id="notes"
                rows="3"
                value={newOrder.notes}
                onChange={(e) => setNewOrder({...newOrder, notes: e.target.value})}
              />
            </div>

            <button type="submit" className="submit-btn">Create Order</button>
          </form>
        </div>
      )}

      {currentView === 'orderItems' && (
        <div className="container">
          <button onClick={showOrdersView} className="back-btn">Back to Orders</button>
          <h2>Order Details</h2>
          {selectedOrder && (
            <div className="order-detail-box">
              <h3>Order #{selectedOrder.orderId}</h3>
              <p><strong>Table:</strong> {selectedOrder.tableNumber}</p>
              <p><strong>Server:</strong> {selectedOrder.serverName}</p>
              <p><strong>Guests:</strong> {selectedOrder.guestCount}</p>
              <p><strong>Total:</strong> {formatCurrency(selectedOrder.total)}</p>
              <p><strong>Notes:</strong> {selectedOrder.notes || 'None'}</p>
            </div>
          )}

          <h3>Items</h3>
          {isLoadingItems ? (
            <div className="loading-indicator">Loading items...</div>
          ) : orderItems.length === 0 ? (
            <p>No items found for this order.</p>
          ) : (
            <div>
            {orderItems.map(item => (
              <div key={item.itemId} className="item-card">
                <h4>{item.itemName}</h4>
                <p><strong>Quantity:</strong> {item.itemQuantity}</p>
                <p><strong>Item Price:</strong> {formatCurrency(item.itemPrice)}</p>
                {item.sides && <p><strong>Sides:</strong> {item.sides}</p>}
                {item.sidePrice !== null && item.sidePrice !== undefined && (
                <p><strong>Side Price:</strong> {formatCurrency(item.sidePrice)}</p>)}
                <p><strong>Item Total:</strong> {formatCurrency(item.itemTotal)}</p>
                {item.modifiers && <p><strong>Modifiers:</strong> {item.modifiers}</p>}
              </div>
            ))}
            </div>
          )}
        </div>
        )}

          {currentView === 'allItems' && (
        <div className="container">
          <button onClick={showLandingView} className="back-btn">← Back to Home</button>
          <h2>All Items</h2>
          {isLoading ? (
            <div className="loading-indicator">Loading...</div>
          ) : items.length === 0 ? (
            <p>No items found.</p>
          ) : (
            <div>
              {items.map(item => (
              <div key={item.itemId} className="item-card">
              <h4>{item.itemName}</h4>
              <p><strong>Order ID:</strong> {item.orderId}</p>
              <p><strong>Quantity:</strong> {item.itemQuantity}</p>
              <p><strong>Item Price:</strong> {formatCurrency(item.itemPrice)}</p>
              {item.sides && <p><strong>Sides:</strong> {item.sides}</p>}
              {item.sidePrice !== null && item.sidePrice !== undefined && (
              <p><strong>Side Price:</strong> {formatCurrency(item.sidePrice)}</p>
              )}
              <p><strong>Item Total:</strong> {formatCurrency(item.itemTotal)}</p>
              {item.modifiers && <p><strong>Modifiers:</strong> {item.modifiers}</p>}
            <div className="card-actions">
                      <button 
                        onClick={() => handleEditItem(item.itemId)} 
                        className="edit-btn"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteItem(item.itemId)} 
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {currentView === 'addItem' && (
          <div className="container">
            <button onClick={showLandingView} className="back-btn">← Back to Home</button>
            <h2>Add New Item</h2>
            <form onSubmit={handleAddItemSubmit} className="form-container">
              <div className="form-group">
                <label htmlFor="itemOrderId">Order ID:</label>
                <input 
                  type="number" 
                  id="itemOrderId" 
                  value={newItem.orderId}
                  onChange={(e) => setNewItem({...newItem, orderId: parseInt(e.target.value)})}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="itemName">Item Name:</label>
                <input 
                  type="text" 
                  id="itemName" 
                  value={newItem.itemName}
                  onChange={(e) => setNewItem({...newItem, itemName: e.target.value})}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="itemQuantity">Quantity:</label>
                <input 
                  type="number" 
                  id="itemQuantity" 
                  value={newItem.itemQuantity}
                  onChange={(e) => setNewItem({...newItem, itemQuantity: parseInt(e.target.value)})}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="itemPrice">Item Price:</label>
                <input 
                  type="number" 
                  step="0.01" 
                  id="itemPrice" 
                  value={newItem.itemPrice}
                  onChange={(e) => setNewItem({...newItem, itemPrice: parseFloat(e.target.value)})}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="sides">Sides (optional):</label>
                <input 
                  type="text" 
                  id="sides" 
                  value={newItem.sides}
                  onChange={(e) => setNewItem({...newItem, sides: e.target.value})}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="sidePrice">Side Price (optional):</label>
                <input 
                  type="number" 
                  step="0.01" 
                  id="sidePrice" 
                  value={newItem.sidePrice}
                  onChange={(e) => setNewItem({...newItem, sidePrice: parseFloat(e.target.value)})}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="modifiers">Modifiers (optional):</label>
                <textarea 
                  id="modifiers" 
                  rows="2"
                  value={newItem.modifiers}
                  onChange={(e) => setNewItem({...newItem, modifiers: e.target.value})}
                />
              </div>
              
              <button type="submit" className="submit-btn">Create Item</button>
            </form>
          </div>
        )}
      </div>
    );
  }    


export default App;