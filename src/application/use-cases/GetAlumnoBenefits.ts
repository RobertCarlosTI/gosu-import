import { GraduationCap, BookOpen, Users, Smartphone } from 'lucide-react';

export const getAlumnoBenefits = () => {
    return [
        {
            id: 1,
            title: "Mentoría 1 a 1",
            description: "Asesoría directa para tu primera importación sin errores.",
            icon: GraduationCap
        },
        {
            id: 2,
            title: "Guía de Proveedores",
            description: "Acceso a nuestra lista de tiendas confiables en USA.",
            icon: BookOpen
        },
        {
            id: 3,
            title: "Comunidad Privada",
            description: "Grupo de WhatsApp exclusivo para compartir datos y ofertas.",
            icon: Users
        }
    ];
};