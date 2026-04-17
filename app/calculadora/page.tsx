// app/calculadora/page.tsx
import { GosuCalculator } from "../../src/presentation/components/calculator/GosuCalculator"; // Así de fácil

export default function CalculatorPage() {
  const mockUser = { nombre: "Robert Carlos", esVip: true };

  return (
    <div className="min-h-screen bg-[#070b12] pt-32 pb-20 px-4 flex flex-col items-center justify-center">
      <GosuCalculator user={mockUser} />
    </div>
  );
}