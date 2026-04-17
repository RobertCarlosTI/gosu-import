import { VipTier } from "@/src/domain/entities/VipTier";

export const getVipTiers = (): VipTier[] => {
    return [
        {
            id: 'bronce',
            name: "Bronce",
            icon: "⭐",
            range: "0 - 300 kg",
            pricePerKg: "$12.00",
            iconColor: "text-orange-400"
        },
        {
            id: 'plata',
            name: "Plata",
            icon: "🌟",
            range: "300 - 600 kg",
            pricePerKg: "$11.00",
            iconColor: "text-slate-300"
        },
        {
            id: 'oro',
            name: "Oro",
            icon: "👑",
            range: "700 - 800 kg",
            pricePerKg: "$10.50",
            isFeatured: true,
            iconColor: "text-[#22c55e]"
        },
        {
            id: 'platino',
            name: "Platino",
            icon: "💎",
            range: "800 + 1 tn",
            pricePerKg: "$9.50",
            iconColor: "text-cyan-400"
        }
    ];
};