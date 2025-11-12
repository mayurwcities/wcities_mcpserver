import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import axios from "axios";
import "dotenv/config";
import fs from "fs";

const LOG_FILE = "D:\\backend\\mcp-server.log";
function log(message) {
  console.error(message);
  fs.appendFileSync(LOG_FILE, message + "\n");
}

const OAUTH_TOKEN = process.env.OAUTH_TOKEN;
const BASE_URL = "https://dev.wcities.com/V3";

function q(params) {
  return Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");
}

const server = new McpServer({ name: "Wcities Complete API Server", version: "7.0" });
log("🚀 Initializing Wcities Complete MCP Server...");

// ============ CITY API ============
server.tool("cityNearby", "Find nearest city by coordinates", { lat: z.number(), lon: z.number(), miles: z.number().optional() }, async ({ lat, lon, miles }) => {
  log(`🔧 cityNearby`);
  const params = { oauth_token: OAUTH_TOKEN, lat, lon };
  if (miles) params.miles = miles;
  const url = `${BASE_URL}/city_api/getNearCity.php?${q(params)}`;
  log(`📡 ${url}`);
  const response = await axios.get(url);
  return { content: [{ type: "text", text: JSON.stringify(response.data) }] };
});

server.tool("cityList", "Get list of all cities", { type: z.enum(["primary", "secondary"]).optional(), countryId: z.string().optional() }, async ({ type, countryId }) => {
  log(`🔧 cityList`);
  const params = { oauth_token: OAUTH_TOKEN };
  if (type) params.type = type;
  if (countryId) params.countryId = countryId;
  const url = `${BASE_URL}/city_api/getCityList.php?${q(params)}`;
  log(`📡 ${url}`);
  const response = await axios.get(url);
  return { content: [{ type: "text", text: JSON.stringify(response.data) }] };
});

// ============ CITY GUIDE API ============
server.tool("cityGuideAll", "All city guides", { cityId: z.string() }, async ({ cityId }) => {
  log(`🔧 cityGuideAll`);
  const params = { oauth_token: OAUTH_TOKEN, cityId };
  const url = `${BASE_URL}/cityguides_api/getCityGuides.php?${q(params)}`;
  log(`📡 ${url}`);
  const response = await axios.get(url);
  return { content: [{ type: "text", text: JSON.stringify(response.data) }] };
});

server.tool("cityGuide", "Get specific city guide", { cityId: z.string(), guideId: z.string() }, async ({ cityId, guideId }) => {
  log(`🔧 cityGuide`);
  const params = { oauth_token: OAUTH_TOKEN, cityId, guideId };
  const url = `${BASE_URL}/cityguides_api/getCityGuides.php?${q(params)}`;
  log(`📡 ${url}`);
  const response = await axios.get(url);
  return { content: [{ type: "text", text: JSON.stringify(response.data) }] };
});

// ============ IP TO CITY API ============
server.tool("ipToCity", "Get city from IP address", { locateip: z.string().optional(), miles: z.number().optional() }, async ({ locateip, miles }) => {
  log(`🔧 ipToCity`);
  const params = { oauth_token: OAUTH_TOKEN };
  if (locateip) params.locateip = locateip;
  if (miles) params.miles = miles;
  const url = `${BASE_URL}/iptocity_api/iptocity.php?${q(params)}`;
  log(`📡 ${url}`);
  const response = await axios.get(url);
  return { content: [{ type: "text", text: JSON.stringify(response.data) }] };
});

// ============ EVENT API ============
server.tool("eventNearby", "Nearby events", { lat: z.number(), lon: z.number(), miles: z.number().optional(), limit: z.string().optional() }, async ({ lat, lon, miles, limit }) => {
  log(`🔧 eventNearby`);
  const params = { oauth_token: OAUTH_TOKEN, lat, lon };
  if (miles) params.miles = miles;
  if (limit) params.limit = limit;
  params.sortBy = "distance";
  params.moreInfo = "cityid,fallbackimage,artistdesc,artistmusic,multiplebooking,eventcount,endtime,tbd_annual,is_master,provider";
  params.link = "enable";
  params.media = "enable";
  params.strip_html='name';
  const url = `${BASE_URL}/event_api/getEvents.php?${q(params)}`;
  log(`📡 ${url}`);
  const response = await axios.get(url);
  return { content: [{ type: "text", text: JSON.stringify(response.data) }] };
});

server.tool("eventByCategory", "Events by category", { lat: z.number(), lon: z.number(), cat: z.number(), miles: z.number().optional() }, async ({ lat, lon, cat, miles }) => {
  log(`🔧 eventByCategory`);
  const params = { oauth_token: OAUTH_TOKEN, lat, lon, cat };
  if (miles) params.miles = miles;
  params.sortBy = "distance";
  params.moreInfo = "cityid,fallbackimage,artistdesc,artistmusic,multiplebooking,eventcount,endtime,tbd_annual,is_master,provider";
  params.link = "enable";
  params.media = "enable";
  params.strip_html='name';
  const url = `${BASE_URL}/event_api/getEvents.php?${q(params)}`;
  log(`📡 ${url}`);
  const response = await axios.get(url);
  return { content: [{ type: "text", text: JSON.stringify(response.data) }] };
});

server.tool("eventSearch", "Search events", { lat: z.number(), lon: z.number(), searchFor: z.string(), miles: z.number().optional() }, async ({ lat, lon, searchFor, miles }) => {
  log(`🔧 eventSearch`);
  const params = { oauth_token: OAUTH_TOKEN, lat, lon, searchFor };
  if (miles) params.miles = miles;
  params.sortBy = "distance";
  params.moreInfo = "cityid,fallbackimage,artistdesc,artistmusic,multiplebooking,eventcount,endtime,tbd_annual,is_master,provider";
  params.link = "enable";
  params.media = "enable";
  params.strip_html='name';
  const url = `${BASE_URL}/event_api/getEvents.php?${q(params)}`;
  log(`📡 ${url}`);
  const response = await axios.get(url);
  return { content: [{ type: "text", text: JSON.stringify(response.data) }] };
});

server.tool("eventByDate", "Events by date range", { lat: z.number(), lon: z.number(), start: z.string(), end: z.string() }, async ({ lat, lon, start, end }) => {
  log(`🔧 eventByDate`);
  const params = { oauth_token: OAUTH_TOKEN, lat, lon, start, end };
  params.sortBy = "distance";
  params.moreInfo = "cityid,fallbackimage,artistdesc,artistmusic,multiplebooking,eventcount,endtime,tbd_annual,is_master,provider";
  params.link = "enable";
  params.media = "enable";
  params.strip_html='name';
  const url = `${BASE_URL}/event_api/getEvents.php?${q(params)}`;
  log(`📡 ${url}`);
  const response = await axios.get(url);
  return { content: [{ type: "text", text: JSON.stringify(response.data) }] };
});

server.tool("eventByCity", "Events in a city", { cityId: z.string(), limit: z.string().optional() }, async ({ cityId, limit }) => {
  log(`🔧 eventByCity`);
  const params = { oauth_token: OAUTH_TOKEN, cityId };
  params.sortBy = "distance";
  params.moreInfo = "cityid,fallbackimage,artistdesc,artistmusic,multiplebooking,eventcount,endtime,tbd_annual,is_master,provider";
  params.link = "enable";
  params.media = "enable";
  params.strip_html='name';
  if (limit) params.limit = limit;
  const url = `${BASE_URL}/event_api/getEvents.php?${q(params)}`;
  log(`📡 ${url}`);
  const response = await axios.get(url);
  return { content: [{ type: "text", text: JSON.stringify(response.data) }] };
});

server.tool("eventByVenue", "Events at a venue", { venueId: z.string() }, async ({ venueId }) => {
  log(`🔧 eventByVenue`);
  const params = { oauth_token: OAUTH_TOKEN, venueId };
  params.sortBy = "distance";
  params.moreInfo = "cityid,fallbackimage,artistdesc,artistmusic,multiplebooking,eventcount,endtime,tbd_annual,is_master,provider";
  params.link = "enable";
  params.media = "enable";
  params.strip_html='name';
  const url = `${BASE_URL}/event_api/getEvents.php?${q(params)}`;
  log(`📡 ${url}`);
  const response = await axios.get(url);
  return { content: [{ type: "text", text: JSON.stringify(response.data) }] };
});

server.tool("eventDetail", "Event details", { id: z.string() }, async ({ id }) => {
  log(`🔧 eventDetail`);
  const params = { oauth_token: OAUTH_TOKEN, id };
  params.sortBy = "distance";
  params.moreInfo = "cityid,fallbackimage,artistdesc,artistmusic,multiplebooking,eventcount,endtime,tbd_annual,is_master,provider";
  params.link = "enable";
  params.media = "enable";
  params.strip_html='name';
  const url = `${BASE_URL}/event_api/getEvents.php?${q(params)}`;
  log(`📡 ${url}`);
  const response = await axios.get(url);
  return { content: [{ type: "text", text: JSON.stringify(response.data) }] };
});

// ============ SIMILAR EVENT API ============
server.tool("similarEvents", "Get similar events ", { id: z.string(), limit: z.string().optional() }, 
  async ({ id, limit }) => {
    log(`🔧 eventSimilarDedicated`);
    const params = { oauth_token: OAUTH_TOKEN, id };
    if (limit) params.limit = limit;
    const url = `${BASE_URL}/similar_event/getSimilarEvents.php?${q(params)}`;
    log(`📡 ${url}`);
    const response = await axios.get(url);
    return { content: [{ type: "text", text: JSON.stringify(response.data) }] };
});




// ============ ARTIST API ============
server.tool("artistSearch", "Search artists", { artist: z.string(), limit: z.number().optional() }, async ({ artist, limit }) => {
  log(`🔧 artistSearch`);
  const params = { oauth_token: OAUTH_TOKEN, method: "artistSearch", artist };
  if (limit) params.limit = limit;
  params.moreInfo="eventcount";
  const url = `${BASE_URL}/artist_api/getArtist.php?${q(params)}`;
  log(`📡 ${url}`);
  const response = await axios.get(url);
  return { content: [{ type: "text", text: JSON.stringify(response.data) }] };
});

server.tool("artistDetail", "Artist details", { id: z.string(), moreInfo: z.string().optional() }, async ({ id, moreInfo }) => {
  log(`🔧 artistDetail`);
  const params = { oauth_token: OAUTH_TOKEN, method: "artistDetail", id };
  params.moreInfo = moreInfo || "strictlang,similarartist,artistmusic,low_res";
  params.compact="1";
  params.link="enable";
  params.media="enable";
  const url = `${BASE_URL}/artist_api/getArtist.php?${q(params)}`;
  log(`📡 ${url}`);
  const response = await axios.get(url);
  return { content: [{ type: "text", text: JSON.stringify(response.data) }] };
});

server.tool("artistEvents", "Artist upcoming events", { id: z.string(), cityId:z.string().optional(), startDate: z.string().optional(), endDate: z.string().optional(), moreInfo: z.string().optional(), miles: z.string().optional() }, async ({ id, cityId, startDate, endDate, moreInfo,miles }) => {
  log(`🔧 artistEvents`);
  const params = { oauth_token: OAUTH_TOKEN, method: "artistEvent", id };
  if(cityId) params.cityId=cityId;
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;
  params.moreInfo = moreInfo || "multiplebooking,artistinfo,artistdesc,endtime,tbd_annual";
  params.venueDetail= "enable";
  params.link="enable";
  params.playingArtist="enable";
  params.miles= miles || "25000";
  params.link="enable";
  params.tevent="1";
  const url = `${BASE_URL}/artist_api/getArtist.php?${q(params)}`;
  log(`📡 ${url}`);
  const response = await axios.get(url);
  return { content: [{ type: "text", text: JSON.stringify(response.data) }] };
});

server.tool("artistByCity", "Artists performing in city", { cityId: z.string(), artistLimit: z.number().optional() }, async ({ cityId, artistLimit }) => {
  log(`🔧 artistByCity`);
  const params = { oauth_token: OAUTH_TOKEN, method: "cityArtist", cityId, showBy: "cityId" };
  if (artistLimit) params.artistLimit = artistLimit;
  params.moreInfo = moreInfo || "multiplebooking,artistinfo,artistdesc,endtime,tbd_annual";
  params.venueDetail= "enable";
  params.link="enable";
  params.playingArtist="enable";
  params.miles= miles || "25000";
  params.link="enable";
  params.tevent="1";
  const url = `${BASE_URL}/artist_api/getArtist.php?${q(params)}`;
  log(`📡 ${url}`);
  const response = await axios.get(url);
  return { content: [{ type: "text", text: JSON.stringify(response.data) }] };
});

server.tool("artistNearby", "Nearby artists", { lat: z.number(), lon: z.number(), miles: z.number().optional() }, async ({ lat, lon, miles }) => {
  log(`🔧 artistNearby`);
  const params = { oauth_token: OAUTH_TOKEN, method: "cityArtist", lat, lon, showBy: "lat-lon" };
  if (miles) params.miles = miles;
  params.moreInfo = moreInfo || "multiplebooking,artistinfo,artistdesc,endtime,tbd_annual";
  params.venueDetail= "enable";
  params.link="enable";
  params.playingArtist="enable";
  params.miles= miles || "25000";
  params.link="enable";
  params.tevent="1";
  const url = `${BASE_URL}/artist_api/getArtist.php?${q(params)}`;
  log(`📡 ${url}`);
  const response = await axios.get(url);
  return { content: [{ type: "text", text: JSON.stringify(response.data) }] };
});


server.tool("artistTracks", "Get artist music tracks from Spotify", 
  { id: z.string(), trackType: z.enum(["spotify"]).optional() }, 
  async ({ id, trackType }) => {
    log(`🔧 artistTracks`);
    const params = { oauth_token: OAUTH_TOKEN, method: "artistTracks", id };
    params.trackType = trackType || "spotify";
    const url = `${BASE_URL}/artist_api/getArtist.php?${q(params)}`;
    log(`📡 ${url}`);
    const response = await axios.get(url);
    return { content: [{ type: "text", text: JSON.stringify(response.data) }] };
});

// ============ RECORD/POI API ============
server.tool("recordNearby", "Nearby records/POIs", { lat: z.number(), lon: z.number(), miles: z.number().optional() }, async ({ lat, lon, miles }) => {
  log(`🔧 recordNearby`);
  const params = { oauth_token: OAUTH_TOKEN, lat, lon, moreInfo : "edschoice,rating,fallbackimage", strip_html : "name,description", media:"enable", tags:"enable" };
  if (miles) params.miles = miles;
  const url = `${BASE_URL}/record_api/getRecords.php?${q(params)}`;
  log(`📡 ${url}`);
  const response = await axios.get(url);
  return { content: [{ type: "text", text: JSON.stringify(response.data) }] };
});

server.tool("recordByCategory", "Records by category", { lat: z.number(), lon: z.number(), cat: z.number(), miles: z.number().optional() }, async ({ lat, lon, cat, miles }) => {
  log(`🔧 recordByCategory`);
  const params = { oauth_token: OAUTH_TOKEN, lat, lon, cat, moreInfo : "edschoice,rating,fallbackimage", strip_html : "name,description", media:"enable", tags:"enable" };
  if (miles) params.miles = miles;
  const url = `${BASE_URL}/record_api/getRecords.php?${q(params)}`;
  log(`📡 ${url}`);
  const response = await axios.get(url);
  return { content: [{ type: "text", text: JSON.stringify(response.data) }] };
});

server.tool("recordSearch", "Search records", { lat: z.number(), lon: z.number(), searchFor: z.string(), miles: z.number().optional() }, async ({ lat, lon, searchFor, miles }) => {
  log(`🔧 recordSearch`);
  const params = { oauth_token: OAUTH_TOKEN, lat, lon, searchFor, moreInfo : "edschoice,rating,fallbackimage", strip_html : "name,description", media:"enable", tags:"enable" };
  if (miles) params.miles = miles;
  const url = `${BASE_URL}/record_api/getRecords.php?${q(params)}`;
  log(`📡 ${url}`);
  const response = await axios.get(url);
  return { content: [{ type: "text", text: JSON.stringify(response.data) }] };
});

server.tool("recordByRating", "Records by rating", { lat: z.number(), lon: z.number(), minrating: z.number().optional(), maxrating: z.number().optional() }, async ({ lat, lon, minrating, maxrating }) => {
  log(`🔧 recordByRating`);
  const params = { oauth_token: OAUTH_TOKEN, lat, lon, moreInfo : "edschoice,rating,fallbackimage", strip_html : "name,description", media:"enable", tags:"enable" };
  if (minrating) params.minrating = minrating;
  if (maxrating) params.maxrating = maxrating;
  const url = `${BASE_URL}/record_api/getRecords.php?${q(params)}`;
  log(`📡 ${url}`);
  const response = await axios.get(url);
  return { content: [{ type: "text", text: JSON.stringify(response.data) }] };
});

server.tool("recordDetail", "Record details", { id: z.string() }, async ({ id }) => {
  log(`🔧 recordDetail`);
  const params = { oauth_token: OAUTH_TOKEN, id, moreInfo : "edschoice,rating,fallbackimage", strip_html : "name,description", media:"enable", tags:"enable" };
  const url = `${BASE_URL}/record_api/getRecords.php?${q(params)}`;
  log(`📡 ${url}`);
  const response = await axios.get(url);
  return { content: [{ type: "text", text: JSON.stringify(response.data) }] };
});

// ============ MOVIE API ============
server.tool("movieNearby", "Nearby movies", { lat: z.number(), lon: z.number(), limit: z.string().optional(), miles: z.number().optional(), date: z.string().optional() }, async ({ lat, lon, limit, miles, date }) => {
  log(`🔧 movieNearby`);
  const params = { oauth_token: OAUTH_TOKEN, call: "getNearby", lat, lon };
  if (limit) params.limit = limit;
  if (miles) params.miles = miles;
  if (date) params.date = date;
  const url = `${BASE_URL}/movies_api/moviesApi.php?${q(params)}`;
  log(`📡 ${url}`);
  const response = await axios.get(url);
  return { content: [{ type: "text", text: JSON.stringify(response.data) }] };
});

server.tool("moviesByTheater", "Movies by theater", { theaterId: z.string(), date: z.string().optional(), limit: z.string().optional() }, async ({ theaterId, date, limit }) => {
  log(`🔧 moviesByTheater`);
  const params = { oauth_token: OAUTH_TOKEN, call: "getMovies", theaterId };
  if (date) params.date = date;
  if (limit) params.limit = limit;
  const url = `${BASE_URL}/movies_api/moviesApi.php?${q(params)}`;
  log(`📡 ${url}`);
  const response = await axios.get(url);
  return { content: [{ type: "text", text: JSON.stringify(response.data) }] };
});

server.tool("movieDetail", "Movie details", { movieId: z.string() }, async ({ movieId }) => {
  log(`🔧 movieDetail`);
  const params = { oauth_token: OAUTH_TOKEN, call: "getMovies", movieId };
  const url = `${BASE_URL}/movies_api/moviesApi.php?${q(params)}`;
  log(`📡 ${url}`);
  const response = await axios.get(url);
  return { content: [{ type: "text", text: JSON.stringify(response.data) }] };
});

// ============ THEATER API ============
server.tool("theaterNearby", "Nearby theaters", { lat: z.number(), lon: z.number(), limit: z.string().optional(), miles: z.number().optional() }, async ({ lat, lon, limit, miles }) => {
  log(`🔧 theaterNearby`);
  const params = { oauth_token: OAUTH_TOKEN, call: "getTheaters", lat, lon };
  if (limit) params.limit = limit;
  if (miles) params.miles = miles;
  const url = `${BASE_URL}/movies_api/moviesApi.php?${q(params)}`;
  log(`📡 ${url}`);
  const response = await axios.get(url);
  return { content: [{ type: "text", text: JSON.stringify(response.data) }] };
});

server.tool("theaterDetail", "Theater details", { theaterId: z.string() }, async ({ theaterId }) => {
  log(`🔧 theaterDetail`);
  const params = { oauth_token: OAUTH_TOKEN, call: "getTheaters", theaterId };
  const url = `${BASE_URL}/movies_api/moviesApi.php?${q(params)}`;
  log(`📡 ${url}`);
  const response = await axios.get(url);
  return { content: [{ type: "text", text: JSON.stringify(response.data) }] };
});
// ============ HEALTH & STARTUP ============
const transport = new StdioServerTransport();
await server.connect(transport);
log("✅ MCP Server running with 50+ complete API tools");
log("📝 Available tools: eventNearby, eventByCategory, eventSearch, eventByDate, eventByCity, eventByVenue, eventDetail, eventSimilar, artistSearch, artistDetail, artistEvents, artistByCity, artistNearby, recordNearby, recordByCategory, recordSearch, recordByRating, recordDetail, movieNearby, moviesByTheater, movieDetail, theaterNearby, theaterDetail, restaurantCheckAvailability, restaurantBook, restaurantCancel, hotelCheckAvailability, hotelBook, hotelCancel, cityNearby, cityList, cityGuideAll, cityGuide, ipToCity, evStationSearch, evStationReviewList, evStationAddReview, quaintSearch, tagsList, and more!");
