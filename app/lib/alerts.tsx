import Swal from 'sweetalert2';

// Configuración para Ventanas de Confirmación (Modales grandes)
export const GosuAlert = Swal.mixin({
  background: '#0f172a', // Fondo azul oscuro (slate-900)
  color: '#ffffff',      // Texto blanco
  confirmButtonColor: '#22c55e', // Verde Gosu
  cancelButtonColor: '#ef4444',  // Rojo peligro
  heightAuto: false,
  customClass: {
    popup: 'rounded-[2.5rem] border border-white/10 shadow-2xl backdrop-blur-xl',
    title: 'font-black italic uppercase tracking-tighter text-2xl',
    confirmButton: 'rounded-xl font-black uppercase italic px-6 py-3 transition-transform hover:scale-105',
    cancelButton: 'rounded-xl font-black uppercase italic px-6 py-3 transition-transform hover:scale-105',
  }
});

// Configuración para Notificaciones Rápidas (Toasts arriba a la derecha)
export const GosuToast = GosuAlert.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  background: '#1e293b', // Un poco más claro para que resalte
  customClass: {
    popup: 'rounded-2xl border border-[#22c55e]/20 shadow-lg',
    title: 'font-bold text-sm italic uppercase'
  }
});