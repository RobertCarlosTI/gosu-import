import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // 1. Buscar al usuario por correo
    const user = await prisma.usuario.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
    }

    // 2. Comparar la contraseña ingresada con la encriptada en Docker
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
    }

    // 3. Devolver los datos del usuario (sin el password)
    return NextResponse.json({
      message: "Login exitoso",
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        esVip: user.esVip
      }
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}