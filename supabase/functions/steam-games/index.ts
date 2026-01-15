import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SteamGame {
  appid: number;
  name: string;
  releaseDate: string;
  headerImage: string;
  shortDescription: string;
  genres: string[];
  platforms: { windows: boolean; mac: boolean; linux: boolean };
  priceOverview?: { final_formatted: string; discount_percent: number };
  metacritic?: { score: number };
  screenshots: string[];
}

// Validate type parameter
const ALLOWED_TYPES = ['new_releases', 'game_details', 'search'] as const;
type RequestType = typeof ALLOWED_TYPES[number];

function isValidType(type: unknown): type is RequestType {
  return typeof type === 'string' && ALLOWED_TYPES.includes(type as RequestType);
}

// Validate appid is a positive integer
function isValidAppId(appid: unknown): boolean {
  const num = Number(appid);
  return Number.isInteger(num) && num > 0 && num <= 999999999;
}

// Validate search query
function isValidQuery(query: unknown): boolean {
  return typeof query === 'string' && query.length > 0 && query.length <= 100;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { type } = body;

    // Validate type parameter
    if (!isValidType(type)) {
      return new Response(JSON.stringify({ error: 'Invalid type parameter' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (type === 'new_releases') {
      // Fetch new releases from Steam's featured endpoint
      const featuredResponse = await fetch(
        'https://store.steampowered.com/api/featuredcategories/?cc=us&l=en'
      );
      const featuredData = await featuredResponse.json();
      
      // Get new releases section
      const newReleases = featuredData?.new_releases?.items || [];
      
      // Fetch detailed info for each game
      const detailedGames: SteamGame[] = [];
      
      for (const game of newReleases.slice(0, 20)) {
        try {
          const detailResponse = await fetch(
            `https://store.steampowered.com/api/appdetails?appids=${game.id}&cc=us&l=en`
          );
          const detailData = await detailResponse.json();
          const gameDetails = detailData?.[game.id]?.data;
          
          if (gameDetails) {
            detailedGames.push({
              appid: game.id,
              name: gameDetails.name,
              releaseDate: gameDetails.release_date?.date || 'Unknown',
              headerImage: gameDetails.header_image,
              shortDescription: gameDetails.short_description || '',
              genres: gameDetails.genres?.map((g: any) => g.description) || [],
              platforms: gameDetails.platforms || { windows: true, mac: false, linux: false },
              priceOverview: gameDetails.price_overview,
              metacritic: gameDetails.metacritic,
              screenshots: gameDetails.screenshots?.slice(0, 4).map((s: any) => s.path_thumbnail) || [],
            });
          }
        } catch (e) {
          console.error(`Error fetching details for ${game.id}:`, e);
        }
      }

      return new Response(JSON.stringify({ games: detailedGames }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (type === 'game_details') {
      const { appid } = body;
      
      // Validate appid is a positive integer
      if (!isValidAppId(appid)) {
        return new Response(JSON.stringify({ error: 'Invalid appid: must be a positive integer' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const detailResponse = await fetch(
        `https://store.steampowered.com/api/appdetails?appids=${appid}&cc=us&l=en`
      );
      const detailData = await detailResponse.json();
      const gameDetails = detailData?.[appid]?.data;

      if (!gameDetails) {
        return new Response(JSON.stringify({ error: 'Game not found' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const game = {
        appid: parseInt(appid),
        name: gameDetails.name,
        releaseDate: gameDetails.release_date?.date || 'Unknown',
        headerImage: gameDetails.header_image,
        shortDescription: gameDetails.short_description || '',
        detailedDescription: gameDetails.detailed_description || '',
        genres: gameDetails.genres?.map((g: any) => g.description) || [],
        platforms: gameDetails.platforms || { windows: true, mac: false, linux: false },
        priceOverview: gameDetails.price_overview,
        metacritic: gameDetails.metacritic,
        screenshots: gameDetails.screenshots?.slice(0, 6).map((s: any) => s.path_thumbnail) || [],
        developers: gameDetails.developers || [],
        publishers: gameDetails.publishers || [],
        categories: gameDetails.categories?.map((c: any) => c.description) || [],
        recommendations: gameDetails.recommendations?.total,
        website: gameDetails.website,
      };

      return new Response(JSON.stringify({ game }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (type === 'search') {
      const { query } = body;
      
      // Validate search query
      if (!isValidQuery(query)) {
        return new Response(JSON.stringify({ error: 'Invalid query: must be 1-100 characters' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      // Search Steam store
      const searchResponse = await fetch(
        `https://store.steampowered.com/api/storesearch/?term=${encodeURIComponent(query)}&cc=us&l=en`
      );
      const searchData = await searchResponse.json();
      
      return new Response(JSON.stringify({ results: searchData.items || [] }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Invalid type' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
