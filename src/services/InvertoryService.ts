import { API } from "@constants/api";
import { IInventoryItem, IProduct } from "./InventoryService.type";

export class InventoryService {
  private static baseUrl: string = "http://184.73.145.4:8085";

  public static readonly getProductsList = async () => {
    const url = `${this.baseUrl}${API.PRODUCTS_LIST}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if(response.ok) {
      return data as Promise<IProduct[]>;
    }
    throw new Error(data.error || "Error fetching inventory list");
  };

  public static readonly getInventoryList = async () => {
    const url = `${this.baseUrl}${API.INVENTORY}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if(response.ok) {
      return data as Promise<IInventoryItem[]>;
    }
    throw new Error(data.error || "Error fetching inventory list");
  };

  public static readonly resetInventory = async () => {
    const url = `${this.baseUrl}${API.RESET_INVENTORY}`;
    const response =  await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if(response.ok) {
      return data as Promise<[]>;
    }
    throw new Error(data.error || "Error fetching inventory list");
  };

  public static readonly createProduct = async (product: IProduct) => {
    const url = `${this.baseUrl}${API.CREATE_PRODUCT}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
		
    const data = await response.json();
    if(response.ok) {
      return data as Promise<IProduct[]>;
    }
    throw new Error(data.error || "Error fetching inventory list");
  };

  public static readonly submitInventory = async (inventory: IInventoryItem[]) => {
    const url = `${this.baseUrl}${API.INVENTORY}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inventory),
    });
		
    const data = await response.json();
    if(response.ok) {
      return data as Promise<IInventoryItem[]>;
    }
    throw new Error(data.error || "Error fetching inventory list");
  };
}