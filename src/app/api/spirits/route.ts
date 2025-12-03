import { NextResponse } from 'next/server';

const spirits = [
  { id: '1', name: 'Kitsune', threatLevel: 'low', location: 'Shibuya', status: 'active', lastUpdated: new Date().toISOString() },
  { id: '2', name: 'Oni', threatLevel: 'critical', location: 'Shinjuku', status: 'active', lastUpdated: new Date().toISOString() },
  { id: '3', name: 'Tengu', threatLevel: 'medium', location: 'Ginza', status: 'captured', lastUpdated: new Date().toISOString() },
  { id: '4', name: 'Kappa', threatLevel: 'high', location: 'Akihabara', status: 'active', lastUpdated: new Date().toISOString() },
  { id: '5', name: 'Yuki-onna', threatLevel: 'low', location: 'Harajuku', status: 'active', lastUpdated: new Date().toISOString() },
  { id: '6', name: 'Jorogumo', threatLevel: 'medium', location: 'Roppongi', status: 'active', lastUpdated: new Date().toISOString() },
  { id: '7', name: 'Nurikabe', threatLevel: 'high', location: 'Asakusa', status: 'captured', lastUpdated: new Date().toISOString() },
  { id: '8', name: 'Rokurokubi', threatLevel: 'critical', location: 'Ueno', status: 'active', lastUpdated: new Date().toISOString() },
  { id: '9', name: 'Ubume', threatLevel: 'low', location: 'Ikebukuro', status: 'active', lastUpdated: new Date().toISOString() },
  { id: '10', name: 'Zashiki-warashi', threatLevel: 'medium', location: 'Odaiba', status: 'active', lastUpdated: new Date().toISOString() },
];

export async function GET() {
  await new Promise(resolve => setTimeout(resolve, 300));
  return NextResponse.json(spirits);
}
