import { supabase } from "./supabaseClient";

export const productRepository = {
    async getAllProducts() {
        const [perfumes, iphones, config] = await Promise.all([
            supabase.from('perfumes').select('*'),
            supabase.from('iphones').select('*'),
            supabase.from('import_config').select('*').single()
        ]);
        return { 
            perfumes: perfumes.data || [], 
            iphones: iphones.data || [], 
            config: config.data 
        };
    }
};