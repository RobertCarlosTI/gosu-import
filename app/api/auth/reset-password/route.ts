import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { userId, newPassword } = await request.json();

        // 1. Encriptar la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // 2. Actualizar en la base de datos local
        await prisma.usuario.update({
            where: { id: userId },
            data: { password: hashedPassword }
        });

        return NextResponse.json({ message: "Contraseña actualizada correctamente" });

    } catch (error) {
        return NextResponse.json({ error: "No se pudo actualizar la contraseña" }, { status: 500 });
    }
}