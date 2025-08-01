"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function OnboardingForm() {
  const { data: session } = useSession();
  const [form, setForm] = useState({
    year: "",
    college: "",
    skills: "",
    availability: "",
    linkedinURL: "",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session) return;

    setLoading(true);

    const payload = {
      ...form,
      skills: form.skills.split(",").map((skill) => skill.trim()),
      userId: session.user.id,
    };

    try {
      const response = await axios.post("/api/onboarding", payload);
      if (response.status === 201 || response.status === 200) {
        toast.success("Profile updated!");
        router.push("/matches");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return <div>Please sign in first</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto py-12 space-y-6">
      <h1 className="text-2xl font-bold">Complete Your Profile</h1>

      <div className="space-y-2">
        <Label>Name</Label>
        <Input value={session.user.name} disabled />
      </div>

      <div className="space-y-2">
        <Label>Year</Label>
        <Input name="year" value={form.year} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <Label>College</Label>
        <Input
          name="college"
          value={form.college}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Skills (comma-separated)</Label>
        <Textarea
          name="skills"
          value={form.skills}
          onChange={handleChange}
          placeholder="e.g., React, Node.js, Express"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Availability</Label>
        <Input
          name="availability"
          value={form.availability}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>LinkedIn URL</Label>
        <Input
          name="linkedinURL"
          value={form.linkedinURL}
          onChange={handleChange}
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Updating..." : "Update Profile"}
      </Button>
    </form>
  );
}
