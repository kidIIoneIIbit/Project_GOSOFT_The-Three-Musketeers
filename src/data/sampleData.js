/**
 * V-SCOPS Sample Data
 * Simulates real-world retail inventory, vendor contracts, and traffic data.
 */

export const STORES = [
  {
    id: 'S001',
    name: 'CP FreshMart Sukhumvit 101',
    type: 'Convenience',
    location: 'Bangkok',
    traffic: 'High',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'S002',
    name: 'CP FreshMart Silom',
    type: 'Express',
    location: 'Bangkok',
    traffic: 'Very High',
    image: 'https://images.unsplash.com/photo-1604719312563-8912e9223c6a?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'S003',
    name: 'CP FreshMart Town in Town',
    type: 'Express',
    location: 'Bangkok',
    traffic: 'Medium',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'S004',
    name: 'CP FreshMart Chiang Mai',
    type: 'Medium-Format',
    location: 'Chiang Mai',
    traffic: 'Medium',
    image: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'S005',
    name: 'CP FreshMart Hua Hin',
    type: 'Tourist-Format',
    location: 'Prachuap Khiri Khan',
    traffic: 'High',
    image: 'https://images.unsplash.com/photo-1582030049448-f8be91008630?auto=format&fit=crop&q=80&w=400'
  }
];

export const VENDORS = [
  { id: 'V001', name: 'CP Foods (CPF)', contractType: 'Own', markdownAllowed: true },
  { id: 'V002', name: 'Betagro', contractType: 'Consignment', markdownAllowed: false },
  { id: 'V003', name: 'Dutch Mill', contractType: 'Consignment', markdownAllowed: true },
  { id: 'V004', name: 'Oishi Group', contractType: 'Own', markdownAllowed: true },
  { id: 'V005', name: 'Tops Grocery', contractType: 'Consignment', markdownAllowed: false }
];

export const INVENTORY = [
  // Ready-to-eat
  {
    id: 'P001',
    name: 'Basil Minced Pork with Rice',
    category: 'Ready-to-eat',
    price: 45,
    margin: 12,
    vendorId: 'V001',
    qty: 24,
    expiryDate: '2026-03-14',
    daysToExpiry: 2,
    sellRate: 8, // units/day
    riskScore: 85,
  },
  {
    id: 'P002',
    name: 'Chicken Green Curry with Rice',
    category: 'Ready-to-eat',
    price: 55,
    margin: 15,
    vendorId: 'V001',
    qty: 15,
    expiryDate: '2026-03-13',
    daysToExpiry: 1,
    sellRate: 10,
    riskScore: 92,
  },
  // Bakery
  {
    id: 'P003',
    name: 'Butter Croissant XL',
    category: 'Bakery',
    price: 35,
    margin: 18,
    vendorId: 'V002',
    qty: 30,
    expiryDate: '2026-03-13',
    daysToExpiry: 1,
    sellRate: 12,
    riskScore: 88,
  },
  {
    id: 'P004',
    name: 'Sandwich Ham Cheese',
    category: 'Bakery',
    price: 29,
    margin: 10,
    vendorId: 'V001',
    qty: 40,
    expiryDate: '2026-03-15',
    daysToExpiry: 3,
    sellRate: 15,
    riskScore: 45,
  },
  // Dairy
  {
    id: 'P005',
    name: 'Fresh Milk 450ml',
    category: 'Dairy',
    price: 25,
    margin: 5,
    vendorId: 'V003',
    qty: 100,
    expiryDate: '2026-03-14',
    daysToExpiry: 2,
    sellRate: 20,
    riskScore: 78,
  },
  {
    id: 'P006',
    name: 'Greek Yogurt Blueberry',
    category: 'Dairy',
    price: 32,
    margin: 8,
    vendorId: 'V005',
    qty: 20,
    expiryDate: '2026-03-13',
    daysToExpiry: 1,
    sellRate: 5,
    riskScore: 95,
  },
  // Beverages
  {
    id: 'P007',
    name: 'Oishi Green Tea Honey Lemon',
    category: 'Beverages',
    price: 20,
    margin: 7,
    vendorId: 'V004',
    qty: 150,
    expiryDate: '2026-05-20',
    daysToExpiry: 68,
    sellRate: 40,
    riskScore: 5,
  }
];
