"use client";

import { useState, useEffect } from "react";
import { Users, Heart, Star, ChefHat, Globe, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAppStats } from "@/services/statsService";

export default function AboutPage() {
  const [appStats, setAppStats] = useState({
    totalRecipes: 0,
    totalUsers: 0,
    totalRatings: 0,
    avgRating: 0,
    totalFavorites: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const stats = await getAppStats();
        setAppStats(stats);
      } catch (error) {
        console.error('Error loading stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const stats = [
    { 
      label: "Recipes Shared", 
      value: loading ? "..." : `${appStats.totalRecipes}+`, 
      icon: <ChefHat className="h-6 w-6 text-orange-500" /> 
    },
    { 
      label: "Food Lovers", 
      value: loading ? "..." : `${appStats.totalUsers}+`, 
      icon: <Users className="h-6 w-6 text-blue-500" /> 
    },
    { 
      label: "Total Reviews", 
      value: loading ? "..." : `${appStats.totalRatings}+`, 
      icon: <Star className="h-6 w-6 text-yellow-500" /> 
    },
    { 
      label: "Total Favorites", 
      value: loading ? "..." : `${appStats.totalFavorites}+`, 
      icon: <Heart className="h-6 w-6 text-red-500" /> 
    }
  ];

  const features = [
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: "Community Driven",
      description: "Built by food lovers, for food lovers. Every recipe comes from passionate home cooks who want to share their culinary discoveries."
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-500" />,
      title: "Quality Assured",
      description: "Our community reviews and rates every recipe, ensuring you get only the best tested recipes that actually work."
    },
    {
      icon: <Globe className="h-8 w-8 text-green-500" />,
      title: "Global Cuisine",
      description: "Discover authentic recipes from around the world, shared by people who know the true flavors of their heritage."
    }
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          About <span className="text-orange-500">FoodieShare</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          FoodieShare is more than just a recipe platform. We're a global community of food enthusiasts 
          who believe that the best meals come from shared experiences, family traditions, and the joy 
          of cooking for the people we love.
        </p>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="inline-flex justify-center items-center mb-4 p-3 rounded-full bg-gray-50">
              {stat.icon}
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
            <div className="text-gray-600 font-medium">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Our Story */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center text-gray-900">Our Story</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-gray-600 leading-relaxed">
              FoodieShare was born from a simple idea: everyone has a recipe that tells a story. 
              Whether it's your grandmother's secret sauce, a dish you discovered while traveling, 
              or your own creative fusion experiment, these recipes connect us to our memories, 
              our cultures, and each other.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Founded in 2024, we started as a small platform where friends could share their 
              favorite recipes. Today, we've grown into a vibrant community where food lovers 
              from around the world come together to discover, share, and celebrate the 
              universal language of good food.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Every recipe on FoodieShare comes with a story, and every cook becomes part of 
              our extended family. We believe that cooking is an act of love, and sharing 
              recipes is sharing that love with the world.
            </p>
          </div>
          <div className="bg-orange-50 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              To create a world where every cook feels empowered to share their culinary 
              creations, where every recipe tells a story, and where food brings people 
              together across all boundaries.
            </p>
            <div className="flex items-center gap-2 text-orange-600">
              <Heart className="h-5 w-5" />
              <span className="font-medium">Made with love, shared with passion</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center text-gray-900">What Makes Us Special</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 rounded-2xl p-8 md:p-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Our Values</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Authenticity</h3>
            <p className="text-gray-600">
              We celebrate real recipes from real people. Every dish tells an authentic story, 
              whether it's a traditional family recipe or a modern innovation.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Inclusivity</h3>
            <p className="text-gray-600">
              Food has no borders, and neither do we. We welcome cooks of all skill levels, 
              backgrounds, and culinary traditions to share their passion.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Quality</h3>
            <p className="text-gray-600">
              We believe every recipe should work the first time. Our community-driven 
              approach ensures recipes are tested, reviewed, and loved.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Connection</h3>
            <p className="text-gray-600">
              Cooking connects us to our heritage, our loved ones, and our community. 
              We foster these connections through every shared recipe.
            </p>
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="text-center space-y-6 bg-orange-500 text-white rounded-2xl p-8 md:p-12">
        <h2 className="text-3xl font-bold">Join Our Culinary Journey</h2>
        <p className="text-xl opacity-90 max-w-2xl mx-auto">
          Ready to share your culinary stories and discover amazing recipes from around the world?
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/recipes">
            <Button 
              size="lg" 
              className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-3"
            >
              Explore Recipes
            </Button>
          </Link>
          <Link href="/login">
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-500 px-8 py-3"
            >
              Join the Community
            </Button>
          </Link>
        </div>
      </section>

      {/* Contact */}
      <section className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Get in Touch</h2>
        <p className="text-gray-600">
          Have questions, suggestions, or just want to say hello? We'd love to hear from you!
        </p>
        <p className="text-orange-500 font-medium">
          Email us at: <a href="mailto:hello@foodieshare.com" className="hover:underline">hello@foodieshare.com</a>
        </p>
      </section>
    </main>
  );
}