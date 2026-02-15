let selectedOrderType = "";
let currentOrder = [];
let subtotal = 0;
let selectedTable = "";
let tableOccupancy = { T1: false, T2: false, T3: false, T4: false }; // false = available, true = occupied

// Keep your original data
const menuItems = [
  {name:"Cheese Burger", cat:"Burgers", img:"https://facts.net/wp-content/uploads/2023/05/plain-cheeseburger-1024x681.jpeg", priceS:30, priceM:35, priceL:50, priceXL:60},
  {name:"Crispy chicken", cat:"Burgers", img:"https://girlheartfood.com/wp-content/uploads/2020/06/Crispy-Chicken-Burger-10.jpg", priceS:34, priceM:39, priceL:55, priceXL:65},
  {name:"Hawaiian Burger", cat:"Burgers", img:"https://png.pngtree.com/thumb_back/fh260/background/20240412/pngtree-hawaiian-pork-burger-pork-with-cheese-and-grilled-pineapple-burger-image_15656319.jpg", priceS:33, priceM:38, priceL:52, priceXL:62},
  {name:"Beef Burger", cat:"Burgers", img:"https://tse3.mm.bing.net/th/id/OIP.RVuQtEcNiscLNfRjkhT0wwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3", priceS:40, priceM:45, priceL:60, priceXL:70},
  {name:"Plain Burger", cat:"Burgers", img:"https://tse2.mm.bing.net/th/id/OIP.VExLkb7GdeggmRROpuzrFgHaFa?rs=1&pid=ImgDetMain&o=7&rm=3", priceS:28, priceM:33, priceL:48, priceXL:58},
  {name:"Cheese", cat:"Fries", img:"https://img.freepik.com/premium-photo/french-fries-with-chili-cheese-powder_51524-22814.jpg?w=2000", priceS:20, priceM:25, priceL:40, priceXL:50},
  {name:"Sweet corn", cat:"Fries", img:"https://potatocorner.com/wp-content/uploads/2021/01/0003_sweet-corn.png", priceS:25, priceM:30, priceL:45, priceXL:55},
  {name:"Sour Cream", cat:"Fries", img:"https://laz-img-sg.alicdn.com/p/622886fd626dc1e42e61129df9158ede.jpg", priceS:27, priceM:32, priceL:48, priceXL:58},
  {name:"Barbeque fries", cat:"Fries", img:"https://pics.craiyon.com/2024-01-22/ZZ-NtpT8Sxe2cmcwv1BiIw.webp", priceS:45, priceM:50, priceL:70, priceXL:80},
  {name:"Chili BBQ", cat:"Fries", img:"https://th.bing.com/th/id/OIP._xNh99Nq8ueVjMOHv4jrfgHaFf?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3", priceS:30, priceM:35, priceL:50, priceXL:60},
  {name:"Footlong", cat:"Hotdog", img:"https://i.imgur.com/o3JoQOj.jpeg", priceS:30, priceM:35, priceL:50, priceXL:60},
  {name:"Classic sandwich", cat:"Hotdog", img:"https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400", priceS:35, priceM:40, priceL:55, priceXL:65},
  {name:"Cheesy hotdog", cat:"Hotdog", img:"https://images.unsplash.com/photo-1612392062631-94dd858cba88?w=400", priceS:40, priceM:45, priceL:60, priceXL:70},
  {name:"Cheesy Hungarian", cat:"Hotdog", img:"https://images.unsplash.com/photo-1541214113241-21578d2d9b62?w=400", priceS:37, priceM:42, priceL:58, priceXL:68},
  {name:"Chili hotdog sandwich", cat:"Hotdog", img:"https://images.unsplash.com/photo-1627037553408-283e446a84f5?w=400", priceS:33, priceM:38, priceL:52, priceXL:62},
  {name:"Coke", cat:"Drinks", img:"https://i.imgur.com/Bo8JYvF.jpeg", priceS:15, priceM:20, priceL:30, priceXL:40},
  {name:"Water", cat:"Drinks", img:"https://i.imgur.com/HXIyFcS.jpeg", priceS:17, priceM:22, priceL:32, priceXL:42},
  {name:"Coke Zero", cat:"Drinks", img:"https://images.unsplash.com/photo-1523472721958-978152f4d69b?w=400", priceS:20, priceM:25, priceL:35, priceXL:45},
  {name:"Iced Tea Lemon", cat:"Drinks", img:"https://images.unsplash.com/photo-1599952299639-e4a11f7d730a?w=400", priceS:20, priceM:25, priceL:35, priceXL:45},
  {name:"Sprite", cat:"Drinks", img:"https://images.unsplash.com/photo-1557800636-894a64c1696f?w=400", priceS:25, priceM:30, priceL:45, priceXL:55},
  {name:"Cheese", cat:"Addons", img:"https://i.imgur.com/7pJqj2D.jpeg", priceS:20, priceM:25, priceL:40, priceXL:50},
  {name:"Lettuce & Tomato", cat:"Addons", img:"https://i.imgur.com/tPqPpAv.jpeg", priceS:23, priceM:28, priceL:42, priceXL:52},
  {name:"Peach Pie", cat:"Addons", img:"https://images.unsplash.com/photo-1562007908-17c67e870c88?w=400", priceS:25, priceM:30, priceL:45, priceXL:55},
  {name:"Cookies (2pcs)", cat:"Addons", img:"https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400", priceS:15, priceM:20, priceL:35, priceXL:45},
  {name:"Fruit Salad", cat:"Addons", img:"https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=400", priceS:30, priceM:35, priceL:50, priceXL:60}
];

// New Order Logic
function newOrder() { if(confirm("Start a new order?")) { currentOrder = []; updateOrderList(); } }

// Receipt Logic
function closeReceipt() {
    // Free the table when receipt is closed
    if (selectedOrderType === 'Dine-In' && selectedTable) {
        tableOccupancy[selectedTable] = false;
        updateTableButtons();
    }
    document.getElementById('receipt-modal').style.display = 'none';
}

// POS Core Logic
function renderMenu(list) {
  const box = document.getElementById("menuContainer");
  box.innerHTML = "";
  list.forEach(item => {
    box.innerHTML += `
      <div class="card" onclick="addToOrder('${item.name}')">
        <img src="${item.img}">
        <div class="info">
          <h4>${item.name}</h4>
          <p>s: ₱${item.priceS} | m: ₱${item.priceM} | l: ₱${item.priceL} | xl: ₱${item.priceXL}</p>
        </div>
      </div>`;
  });
}

function filterCategory(cat, el) {
  document.querySelectorAll(".category").forEach(c => c.classList.remove("active"));
  el.classList.add("active");
  renderMenu(menuItems.filter(i => i.cat === cat));
}

function searchMenu() {
  let q = document.getElementById("searchInput").value.toLowerCase();
  document.querySelectorAll(".category").forEach(c => c.classList.remove("active"));
  renderMenu(menuItems.filter(i => i.name.toLowerCase().includes(q)));
}

function changeSize(type, val) {
  let span = document.getElementById(type + "Qty");
  let num = parseInt(span.textContent) + val;
  if (type === 'quantity') {
    num = Math.min(99, Math.max(1, num));
  } else {
    num = Math.max(0, num);
  }
  span.textContent = num;
}

function addToOrder(name) {
  const sizeSelect = document.getElementById("sizeSelect");
  const quantitySpan = document.getElementById("quantityQty");
  const selectedSize = sizeSelect.value.toUpperCase();
  const quantity = parseInt(quantitySpan.textContent);
  if (quantity < 1) return alert("Select a quantity!");
  const item = menuItems.find(i => i.name === name);
  const price = item['price' + selectedSize];
  currentOrder.push({ desc: `${selectedSize} - ${name}`, qty: quantity, total: price * quantity });
  updateOrderList();
}

function updateOrderList() {
  const list = document.getElementById("orderList");
  list.innerHTML = "";
  subtotal = 0;
  currentOrder.forEach((item, index) => {
    subtotal += item.total;
    list.innerHTML += `<div class="order-item"><span>${item.qty}x ${item.desc}</span><span>₱${item.total} <button onclick="removeItem(${index})">x</button></span></div>`;
  });
  document.getElementById("total").textContent = subtotal;
}

function removeItem(index) { currentOrder.splice(index, 1); updateOrderList(); }
function clearCart() { if(confirm("Clear current order?")) { currentOrder = []; updateOrderList(); } }

// ---------------------------------------------
// NEW ADVANCED UI LOGIC
// ---------------------------------------------
function openAdvancedUI(type) {
    if (currentOrder.length === 0) return alert("Order list is empty!");
    selectedOrderType = type;
    
    document.getElementById('ui-checkout-title').innerText = type.toUpperCase();
    document.getElementById('ui-display-total').innerText = subtotal;
    
    // Random Number
    document.getElementById('ui-random-num').innerText = Math.floor(1000 + Math.random() * 9000);
    
    // Toggle Layout
    const tableCol = document.getElementById('ui-col-tables');
    if(type === 'Dine-In') {
        tableCol.style.display = 'flex';
    } else {
        tableCol.style.display = 'none';
        selectedTable = "Take Out";
    }

    document.getElementById('advanced-checkout').style.display = 'flex';
}

function setTable(num) {
    const tableKey = "T" + num;
    if (tableOccupancy[tableKey]) {
        alert("Table " + num + " is occupied!");
        return;
    }
    selectedTable = tableKey;
    document.querySelectorAll('.table-node').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
}

function confirmPayment() {
    if(selectedOrderType === 'Dine-In' && !selectedTable) return alert("Select a Table!");
    const staff = document.getElementById('staff-select').value;
    const orderNum = document.getElementById('ui-random-num').innerText;
    const receiptDetails = document.getElementById('receipt-details');
    receiptDetails.innerHTML = `
        <strong>Order #${orderNum}</strong><br>
        Type: ${selectedOrderType}<br>
        Table: ${selectedTable}<br>
        Staff: ${staff}<br><br>
        <strong>Items:</strong><br>
        ${currentOrder.map(item => `${item.qty}x ${item.desc} - ₱${item.total}`).join('<br>')}<br><br>
        <div class="receipt-total">Total: ₱${subtotal}</div>
    `;
    // Mark table as occupied if dine-in
    if (selectedOrderType === 'Dine-In' && selectedTable) {
        tableOccupancy[selectedTable] = true;
        updateTableButtons();
    }
    document.getElementById('receipt-modal').style.display = 'flex';
    closeAdvancedCheckout();
    currentOrder = [];
    updateOrderList();
}

function closeAdvancedCheckout() { document.getElementById('advanced-checkout').style.display = 'none'; selectedTable = ""; }

function updateTableButtons() {
    const buttons = document.querySelectorAll('.table-node');
    buttons.forEach(button => {
        const num = button.textContent.replace(' (occupied)', '').replace('T', '');
        const tableKey = "T" + num;
        if (tableOccupancy[tableKey]) {
            button.textContent = "T" + num + " (occupied)";
            button.classList.add('occupied');
        } else {
            button.textContent = "T" + num;
            button.classList.remove('occupied');
        }
    });
}

// ---------------------------------------------
// ADMIN PANEL LOGIC
// ---------------------------------------------
function openAdminPanel() {
    document.getElementById('admin-password-modal').style.display = 'flex';
}

function closePasswordModal() {
    document.getElementById('admin-password-modal').style.display = 'none';
    document.getElementById('admin-password').value = '';
}

function checkAdminPassword() {
    const password = document.getElementById('admin-password').value;
    if (password === "sean") {
        document.getElementById('admin-password-modal').style.display = 'none';
        document.getElementById('admin-panel').style.display = 'flex';
        document.getElementById('admin-details').innerHTML = '<p>Select a function to view details.</p>';
        document.getElementById('admin-password').value = '';
    } else {
        alert("Incorrect password. Access denied.");
        document.getElementById('admin-password').value = '';
    }
}

function togglePasswordVisibility() {
    const passwordInput = document.getElementById('admin-password');
    const toggleBtn = document.getElementById('toggle-password');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = 'Hide';
    } else {
        passwordInput.type = 'password';
        toggleBtn.textContent = 'Show';
    }
}

function closeAdminPanel() {
    document.getElementById('admin-panel').style.display = 'none';
}

function manageMenuItems() {
    const details = document.getElementById('admin-details');
    details.innerHTML = `
        <h3>Manage Menu Items</h3>
        <p>Here you can add, edit, or remove menu items.</p>
        <ul>
            <li>Add new items to the menu</li>
            <li>Update prices and descriptions</li>
            <li>Change item categories</li>
            <li>Upload new images</li>
        </ul>
        <button onclick="alert('Add Item functionality')">Add New Item</button>
        <button onclick="alert('Edit Item functionality')">Edit Item</button>
    `;
}

function viewOrders() {
    const details = document.getElementById('admin-details');
    details.innerHTML = `
        <h3>View Orders</h3>
        <p>View all completed orders and their details.</p>
        <div style="background: white; padding: 10px; border-radius: 5px;">
            <p><strong>Recent Orders:</strong></p>
            <p>Order #1234 - Dine-In - Table T1 - ₱250</p>
            <p>Order #1235 - Take-Out - ₱180</p>
            <p>Order #1236 - Dine-In - Table T2 - ₱320</p>
        </div>
        <button onclick="alert('View All Orders functionality')">View All Orders</button>
    `;
}

function manageStaff() {
    const details = document.getElementById('admin-details');
    details.innerHTML = `
        <h3>Manage Staff</h3>
        <p>Manage kitchen staff and their assignments.</p>
        <ul>
            <li>Add new staff members</li>
            <li>Update staff information</li>
            <li>Assign staff to orders</li>
            <li>View staff performance</li>
        </ul>
        <button onclick="alert('Add Staff functionality')">Add Staff</button>
        <button onclick="alert('Edit Staff functionality')">Edit Staff</button>
    `;
}

function viewReports() {
    const details = document.getElementById('admin-details');
    details.innerHTML = `
        <h3>View Reports</h3>
        <p>Generate and view various reports.</p>
        <ul>
            <li>Daily sales report</li>
            <li>Popular items report</li>
            <li>Staff performance report</li>
            <li>Inventory report</li>
        </ul>
        <button onclick="alert('Generate Daily Report functionality')">Generate Daily Report</button>
        <button onclick="alert('Generate Monthly Report functionality')">Generate Monthly Report</button>
    `;
}

function manageTables() {
    const details = document.getElementById('admin-details');
    details.innerHTML = `
        <h3>Manage Tables</h3>
        <p>Manage restaurant tables and their status.</p>
        <ul>
            <li>Add or remove tables</li>
            <li>Update table status (available/occupied)</li>
            <li>View table layout</li>
        </ul>
        <button onclick="alert('Add Table functionality')">Add Table</button>
        <button onclick="alert('Edit Table functionality')">Edit Table</button>
    `;
}

function systemSettings() {
    const details = document.getElementById('admin-details');
    details.innerHTML = `
        <h3>System Settings</h3>
        <p>Configure system-wide settings.</p>
        <ul>
            <li>Change restaurant name</li>
            <li>Update tax rates</li>
            <li>Configure payment methods</li>
            <li>Backup and restore data</li>
        </ul>
        <button onclick="alert('Update Settings functionality')">Update Settings</button>
        <button onclick="alert('Backup Data functionality')">Backup Data</button>
    `;
}

// Init
renderMenu(menuItems.filter(i => i.cat === 'Burgers'));
