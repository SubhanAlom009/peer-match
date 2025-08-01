import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET - Fetch all connections for a user
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Fetch connections where user is either the requester or receiver
    const connections = await prisma.connection.findMany({
      where: {
        OR: [{ requesterId: userId }, { receiverId: userId }],
        status: "ACCEPTED", // Only show accepted connections
      },
      include: {
        requester: {
          select: {
            id: true,
            name: true,
            email: true,
            year: true,
            college: true,
            skills: true,
            availability: true,
            linkedinURL: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            email: true,
            year: true,
            college: true,
            skills: true,
            availability: true,
            linkedinURL: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Format connections to show the "other" user
    const formattedConnections = connections.map((connection) => {
      const otherUser =
        connection.requesterId === userId
          ? connection.receiver
          : connection.requester;

      return {
        id: connection.id,
        user: otherUser,
        connectedSince: connection.createdAt,
        status: connection.status,
      };
    });

    return NextResponse.json(
      { connections: formattedConnections },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching connections:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST - Create a new connection
export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, connectToId } = body;

    if (!userId || !connectToId) {
      return NextResponse.json(
        { error: "Both userId and connectToId are required" },
        { status: 400 }
      );
    }

    if (userId === connectToId) {
      return NextResponse.json(
        { error: "Cannot connect to yourself" },
        { status: 400 }
      );
    }

    // Check if connection already exists
    const existingConnection = await prisma.connection.findFirst({
      where: {
        OR: [
          { requesterId: userId, receiverId: connectToId },
          { requesterId: connectToId, receiverId: userId },
        ],
      },
    });

    if (existingConnection) {
      return NextResponse.json(
        { error: "Connection already exists" },
        { status: 409 }
      );
    }

    // Create new connection (auto-accept for simplicity)
    const newConnection = await prisma.connection.create({
      data: {
        requesterId: userId,
        receiverId: connectToId,
        status: "ACCEPTED", // Auto-accept for now
      },
      include: {
        requester: {
          select: {
            id: true,
            name: true,
            email: true,
            year: true,
            college: true,
            skills: true,
            availability: true,
            linkedinURL: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            email: true,
            year: true,
            college: true,
            skills: true,
            availability: true,
            linkedinURL: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: "Connection created successfully",
        connection: newConnection,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating connection:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE - Remove a connection
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const connectionId = searchParams.get("connectionId");
    const userId = searchParams.get("userId");

    if (!connectionId || !userId) {
      return NextResponse.json(
        { error: "Connection ID and User ID are required" },
        { status: 400 }
      );
    }

    // Verify user owns this connection
    const connection = await prisma.connection.findFirst({
      where: {
        id: connectionId,
        OR: [{ requesterId: userId }, { receiverId: userId }],
      },
    });

    if (!connection) {
      return NextResponse.json(
        { error: "Connection not found or unauthorized" },
        { status: 404 }
      );
    }

    // Delete the connection
    await prisma.connection.delete({
      where: { id: connectionId },
    });

    return NextResponse.json(
      { message: "Connection removed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting connection:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
