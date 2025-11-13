'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapComponentProps {
  coordinates: { lat: number; lng: number } | null;
  onLocationSelect?: (lat: number, lng: number) => void;
}

export default function MapComponent({ coordinates, onLocationSelect }: MapComponentProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Map zaten oluşturulmuşsa tekrar oluşturma
    if (mapRef.current) return;

    // Leaflet ikonlarını düzelt
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });

    // Haritayı oluştur
    const map = L.map(mapContainerRef.current, {
      preferCanvas: true,
      zoomControl: true,
      attributionControl: true,
    });

    mapRef.current = map;

    // Tile layer ekle
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
      minZoom: 2,
    }).addTo(map);

    // Başlangıç konumu
    if (coordinates && coordinates.lat && coordinates.lng) {
      map.setView([coordinates.lat, coordinates.lng], 15);
      markerRef.current = L.marker([coordinates.lat, coordinates.lng]).addTo(map);
    } else {
      map.setView([39.0, 35.0], 6); // Türkiye genel görünümü
    }

    // Harita tıklama olayı
    map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;

      // Eski marker'ı kaldır
      if (markerRef.current) {
        map.removeLayer(markerRef.current);
      }

      // Yeni marker ekle
      markerRef.current = L.marker([lat, lng]).addTo(map);

      // Callback'i çağır
      if (onLocationSelect) {
        onLocationSelect(lat, lng);
      }
    });

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Koordinatlar değiştiğinde haritayı güncelle
  useEffect(() => {
    if (mapRef.current && coordinates && coordinates.lat && coordinates.lng) {
      mapRef.current.setView([coordinates.lat, coordinates.lng], 15);

      // Eski marker'ı kaldır
      if (markerRef.current) {
        mapRef.current.removeLayer(markerRef.current);
      }

      // Yeni marker ekle
      markerRef.current = L.marker([coordinates.lat, coordinates.lng]).addTo(mapRef.current);
    }
  }, [coordinates]);

  return <div ref={mapContainerRef} id="map" style={{ width: '100%', height: '300px' }} />;
}
