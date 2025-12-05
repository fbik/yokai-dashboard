import axios from 'axios';
import { Spirit, SpiritCaptureRequest } from '../model/types';

const API_BASE = '/api';

export const spiritApi = {
  // Получить всех духов
  getAll: () => 
    axios.get<Spirit[]>(`${API_BASE}/spirits`).then(res => res.data),

  // Получить конкретного духа
  getById: (id: string) => 
    axios.get<Spirit>(`${API_BASE}/spirits/${id}`).then(res => res.data),

  // Отправить отряд для поимки духа
  capture: (request: SpiritCaptureRequest) =>
    axios.post(`${API_BASE}/spirits/capture`, request),

  // Обновить статус духа
  updateStatus: (id: string, status: Spirit['status']) =>
    axios.patch(`${API_BASE}/spirits/${id}`, { status }),
};
