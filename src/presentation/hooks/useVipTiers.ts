import { useState, useEffect } from 'react';
import { VipTier } from '@/src/domain/entities/VipTier';
import { getVipTiers } from '@/src/application/use-cases/GetVipTiers';

export const useVipTiers = () => {
    const [tiers, setTiers] = useState<VipTier[]>([]);

    useEffect(() => {
        // Aquí podrías llamar a una API real en el futuro
        const data = getVipTiers();
        setTiers(data);
    }, []);

    return { tiers };
};