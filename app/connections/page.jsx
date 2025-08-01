"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, ExternalLink } from "lucide-react";

export default function Connections() {
  // Mock connections data
  const connections = [
    {
      id: 1,
      name: "Alex Johnson",
      year: "3rd Year",
      college: "Tech University",
      skills: ["JavaScript", "React"],
      status: "Active",
      connectedSince: "2 weeks ago",
      linkedinURL: "https://linkedin.com/in/alexjohnson",
    },
  ];

  return (
    <div className="container mx-auto py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Connections</h1>
        <p className="text-muted-foreground">
          Manage your study partnerships and collaborations
        </p>
      </div>

      {connections.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {connections.map((connection) => (
            <Card key={connection.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{connection.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {connection.year} • {connection.college}
                    </p>
                  </div>
                  <Badge variant="outline">{connection.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {connection.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  Connected {connection.connectedSince}
                </p>

                <div className="flex gap-2">
                  <Button className="flex-1" size="sm">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Message
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      window.open(connection.linkedinURL, "_blank")
                    }
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardContent>
            <h3 className="text-lg font-medium mb-2">No connections yet</h3>
            <p className="text-muted-foreground mb-4">
              Start connecting with study partners to build your network.
            </p>
            <Button>Find Matches</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
