// api.ts

const API_BASE_URL = 'http://localhost:5000';

export interface Product {
    product_id: number,
    product_name: string;
    description: string;
    price: number;
    tax_id?: number | null;
    discount_id?: number | null;
  }

export interface Tax {
    tax_id: number;
    tax_name: string;
  }

export interface Discount {
  discount_id: number;
  discount_type: string;
  discount_value: string;
}

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/products`);
  return response.json();
}

export async function fetchTaxes(): Promise<Tax[]> {
  const response = await fetch(`${API_BASE_URL}/taxes`);
  return response.json();
}

export async function fetchDiscounts(): Promise<Discount[]> {
  const response = await fetch(`${API_BASE_URL}/discounts`);
  return response.json();
}

export async function createProduct(product: Omit<Product, 'id'>): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  return response.json();
}

export async function updateProduct(id: number, product: Partial<Product>): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  return response.json();
}

export async function deleteProduct(id: number): Promise<void> {
  await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'DELETE',
  });
}

// Similarly, create functions for taxes and discounts (createTax, updateTax, deleteTax, createDiscount, updateDiscount, deleteDiscount)
