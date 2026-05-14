import { api } from '@/config/axios-client.config';

export type Trip = {
  id: string;
  title: string;
  description: string | null;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number | null;
  status: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateTripInput = {
  title: string;
  description?: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget?: number;
  status?: string;
};

export type UpdateTripInput = Partial<CreateTripInput>;

export const TripService = {
  // List all trips with pagination
  list: async (page: number = 1, limit: number = 10) => {
    const res = await api.get<{
      data: Trip[];
      pagination: {
        total: number;
        page: number;
        limit: number;
        pages: number;
      };
    }>('/trips', {
      params: { page, limit },
    });
    return res.data;
  },

  // Get single trip
  getById: async (id: string) => {
    const res = await api.get<Trip>(`/trips/${id}`);
    return res.data;
  },

  // Create trip
  create: async (data: CreateTripInput) => {
    const res = await api.post<Trip>('/trips', data);
    return res.data;
  },

  // Update trip
  update: async (id: string, data: UpdateTripInput) => {
    const res = await api.patch<Trip>(`/trips/${id}`, data);
    return res.data;
  },

  // Delete trip
  delete: async (id: string) => {
    const res = await api.delete<{ message: string }>(`/trips/${id}`);
    return res.data;
  },
};
