"use client";
import Image from "next/image";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Brain, Rocket, Trophy, User, MessageSquare, Heart, Lightbulb, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { BACKEND_URL } from "@/lib/constants";
import { authFetch } from "@/lib/authFetsh";
import Link from "next/link";

interface Trait {
  trait: string;  // Changed from 'name' to 'trait'
  percentage: number;  // Changed from 'value' to 'percentage'
}

interface RoleModel {
  name: string;
  description: string;
  matchPercentage: number;  // Changed from 'match' to 'matchPercentage'
  similarTraits: string[];  // Changed from string to string[]
}

interface Profile {
  title: string;
  keyTraits: Trait[];  // Changed from 'traits' to 'keyTraits'
  strengths: string[];
  roleModels: RoleModel[];
  personalityType?: string;
}

export default function PersonalityAnalysisPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  
  const personalityType = searchParams?.get('type');
  const description = searchParams?.get('description');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!personalityType) {
          throw new Error("Missing personality type parameter");
        }

        const payload = { 
          type: personalityType, 
          description: description || "" 
        };

        const res = await authFetch(`${BACKEND_URL}/personality-test/generate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(
            errorData.message || 
            `Request failed with status ${res.status}`
          );
        }

        const data = await res.json();
        
        // Validate response structure
        if (!data || typeof data !== "object") {
          throw new Error("Invalid response format from server");
        }

        // Transform data to ensure it matches our Profile interface
        const transformedProfile: Profile = {
          title: data.title || `${personalityType} Personality Profile`,
          keyTraits: Array.isArray(data.keyTraits)
            ? data.keyTraits.map((t: any) => ({
                trait: t.trait || "Unnamed trait",
                percentage: typeof t.percentage === "number" ? t.percentage : 50
              }))
            : [],
          strengths: Array.isArray(data.strengths) 
            ? data.strengths 
            : [],
          roleModels: Array.isArray(data.roleModels) 
            ? data.roleModels.map((r: any) => ({
                name: r.name || "Unknown",
                description: r.description || "No description available",
                matchPercentage: r.matchPercentage || 0,
                similarTraits: Array.isArray(r.similarTraits) ? r.similarTraits : []
              }))
            : [],
          personalityType
        };

        setProfile(transformedProfile);
        
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError(
          err instanceof Error 
            ? err.message 
            : "Failed to load personality profile"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [personalityType, description]);
  console.log('profile',profile); // Log the profile object


  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <Brain className="w-12 h-12 text-blue-500 animate-bounce" />
          <p className="text-lg font-medium">Analyzing your personality...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4 p-6 text-center">
        <Brain className="w-16 h-16 text-red-500" />
        <h2 className="text-2xl font-bold text-red-600">Failed to load profile</h2>
        <p className="text-gray-600 max-w-md">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4 p-6 text-center">
        <Brain className="w-16 h-16 text-gray-400" />
        <h2 className="text-2xl font-bold text-gray-700">No profile data available</h2>
        <p className="text-gray-600 max-w-md">
          We couldn't generate a personality profile. Please check your input and try again.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-8 max-w-4xl mx-auto">
      <div className="fixed top-4 right-4 z-50">
      <Link href="/user"><Image
        src="/exit.png" 
        alt="Top Right Image"
        width={40} 
        height={30}
      />
      </Link>
    </div>
      {/* Personality Header Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="absolute right-4 top-4 opacity-20">
          <Sparkles className="w-24 h-24" />
        </div>
        <CardHeader>
          <Badge variant="secondary" className="w-fit bg-white/20 backdrop-blur-sm text-white">
            Your Personality Profile
          </Badge>
        </CardHeader>
        <CardContent className="relative z-10 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold">{profile.title}</h1>
              <div className="flex items-center gap-2 mt-1">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                  {profile.title}
                </span>
              </div>
              {description && (
                <p className="text-white/90 mt-3 max-w-2xl">{description}</p>
              )}
            </div>
            <div className="bg-white/10 p-3 rounded-full">
              <Brain className="w-8 h-8" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Traits */}
      <Card className="shadow-sm">
        <CardHeader>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Rocket className="w-5 h-5 text-blue-600" />
            Your Key Traits
          </h2>
          <p className="text-sm text-gray-500">These characteristics define your personality</p>
        </CardHeader>
        <CardContent className="space-y-4">
        {profile.keyTraits.map((trait, index) => (
  <div key={index} className="space-y-2">
    <div className="flex justify-between text-sm">
      <span className="font-medium">{trait.trait}</span>
      <span className="text-gray-500">{trait.percentage}%</span>
    </div>
    <Progress 
      value={trait.percentage} 
      className="h-2 bg-gray-100"
    />
  </div>
))}
        </CardContent>
      </Card>

      {/* Strengths */}
      <Card className="shadow-sm">
        <CardHeader>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            Your Superpowers
          </h2>
          <p className="text-sm text-gray-500">Areas where you naturally excel</p>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-3 md:grid-cols-2">
            {profile.strengths.map((strength, index) => (
              <li key={index} className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
                <div className="bg-amber-100 p-2 rounded-full">
                  {index % 3 === 0 ? (
                    <Heart className="w-4 h-4 text-amber-600" />
                  ) : index % 3 === 1 ? (
                    <Lightbulb className="w-4 h-4 text-amber-600" />
                  ) : (
                    <Users className="w-4 h-4 text-amber-600" />
                  )}
                </div>
                <span className="flex-1">{strength}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Role Models */}
      <Card className="shadow-sm">
        <CardHeader>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <User className="w-5 h-5 text-purple-500" />
            Inspirational Role Models
          </h2>
          <p className="text-sm text-gray-500">People who share your personality traits</p>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {profile.roleModels.map((model, index) => (
  <Card key={index} className="hover:shadow-md transition-shadow">
    <CardContent className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">{model.name}</h3>
        <Badge variant="outline" className="text-purple-600">
          {model.matchPercentage}% match
        </Badge>
      </div>
      <p className="text-sm text-gray-600">
        {model.description}
      </p>
      <div className="flex justify-between items-center pt-2">
        <span className="text-xs text-gray-500">
          Similar traits: {model.similarTraits.join(', ')}
        </span>
        <MessageSquare className="w-4 h-4 text-gray-400" />
      </div>
    </CardContent>
  </Card>
))}
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 py-6">
        <p>Your personalized personality analysis based on the {profile.personalityType} type</p>
        <p className="mt-1">Explore more about how this impacts your relationships and career choices</p>
      </div>
    </div>
  );
}