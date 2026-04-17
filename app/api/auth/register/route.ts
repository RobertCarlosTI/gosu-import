import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { email, password, name, phone } = await request.json();

        // 1. Validar si el usuario ya existe
        const existingUser = await prisma.usuario.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json({ error: "Este correo ya está registrado" }, { status: 400 });
        }

        // 2. Encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Crear en la base de datos local
        const user = await prisma.usuario.create({
            data: {
                nombre: name,
                email: email,
                password: hashedPassword,
                // Si es tu correo de administrador, lo hacemos VIP de una vez
                esVip: email === 'gosu.import01@gmail.com'
            }
        });

        return NextResponse.json({ 
            message: "Usuario creado con éxito", 
            userId: user.id 
        }, { status: 201 });

    } catch (error) {
        console.error("REGISTER_ERROR", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}